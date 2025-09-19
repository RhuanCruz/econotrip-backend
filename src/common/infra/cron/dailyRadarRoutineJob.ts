/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import cron from 'node-cron';
import { AppContainer } from '@src/common/container';
import Types from '@src/common/container/types';
import IRadarRepository from '@modules/radar/repositories/IRadarRepository';
import IRadarRoutineProvider from '@common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';
import { IPushNotificationProvider } from '@common/providers/PushNotificationProvider';
// import { IMessageRepository } from '@src/common/providers/MessageProvider/repositories/IMessageRepository';
import IUserRepository from '@src/modules/user/repositories/IUserRepository';
import IEmailProvider from '@src/common/providers/EmailProvider/repositories/IEmailProvider';
import INotificationRepository from '@src/modules/notification/repositories/INotificationRepository';

// Agenda para rodar todo dia ao meio dia
cron.schedule('0 12 * * *', async () => {
  const radarRepository = AppContainer.get<IRadarRepository>(Types.RadarRepository);
  const radarRoutineProvider = AppContainer.get<IRadarRoutineProvider>(Types.RadarRoutineProvider);
  const pushProvider = AppContainer.get<IPushNotificationProvider>(Types.PushNotificationProvider);
  // const messageProvider = AppContainer.get<IMessageRepository>(Types.MessageProvider);
  const userRepository = AppContainer.get<IUserRepository>(Types.UserRepository);
  const emailProvider = AppContainer.get<IEmailProvider>(Types.EmailProvider);
  const notificationRepository = AppContainer.get<INotificationRepository>(Types.NotificationRepository);

  // LocationRepository para buscar nomes das cidades
  const locationRepository = AppContainer.get<any>(Types.LocationRepository);

  const notificationType = await notificationRepository.getTypeByName('RADAR_PRICE');

  // Buscar todos os radares ativos
  const activeRadars = await radarRepository.list({});

  // Coletar todos os IATAs únicos de origem e destino dos radares
  const iataSet = new Set<string>();
  activeRadars.forEach((radar) => {
    iataSet.add(radar.origin);
    iataSet.add(radar.destination);
  });

  // Buscar todas as localizações necessárias de uma vez
  const iataList = Array.from(iataSet);
  const locations = await Promise.all(iataList.map((iata) => locationRepository.getByIata(iata)));
  const iataToCity: Record<string, string> = {};
  for (const loc of locations) {
    if (loc && loc.iata) {
      iataToCity[loc.iata] = loc.cityName ? `${loc.cityName} (${loc.iata})` : loc.iata;
    }
  }

  for (const radar of activeRadars) {
    const result = await radarRoutineProvider.listResults({ origin: radar.origin, destination: radar.destination, type: radar.type as 'MONEY' | 'AIRMILES' });
    if (result && result.results && result.results.length > 0) {
      const bestOffer = result.results.reduce((min, curr) => (curr.value < min.value ? curr : min), result.results[0]);

      if (radar.value && radar.value < bestOffer.value) continue;

      const user = await userRepository.findById(radar.userId);
      if (!user) continue;

      if (notificationType) {
        const notification = await notificationRepository.create({
          message: `Radar de ${bestOffer.origin} para ${bestOffer.destination} achou uma oferta de ${bestOffer.type === 'MONEY' ? 'R$' : ''} ${bestOffer.value}${bestOffer.type === 'AIRMILES' ? ' milhas' : ''}. Entre no sistema para mais informações.`,
          title: `Radar de ${bestOffer.origin} - ${bestOffer.destination}`,
          type: { connect: { id: notificationType.id } },
          user: { connect: { id: user.id } },
          sentAt: new Date(),
        });

        await notificationRepository.connectNotificationToRadar(notification.id, radar.id);
      }

      // let userPhone = user?.phone;

      // if (userPhone && !userPhone.startsWith('+')) {
      //   userPhone = `+55${userPhone.replace(/^0+/, '')}`;
      // }

      // if (user && userPhone) {
      //   await messageProvider.sendSMS({
      //     to: userPhone,
      //     message: `[Econotrip] Radar de ${bestOffer.origin} para ${bestOffer.destination} achou uma oferta de ${bestOffer.type === 'MONEY' ? 'R$' : ''} ${bestOffer.value}${bestOffer.type === 'AIRMILES' ? ' milhas' : ''}. Entre no sistema para mais informações.`,
      //   }).catch((err) => {
      //     console.warn('Não foi possível enviar SMS para o usuário:', err);
      //   });
      // }

      if (user && user.email) {
        // Formata a data da oferta para DD/MM/YYYY
        const offerDate = bestOffer.date ? new Date(bestOffer.date) : null;
        const formattedDate = offerDate ? `${offerDate.getDate().toString().padStart(2, '0')}/${(offerDate.getMonth() + 1).toString().padStart(2, '0')}/${offerDate.getFullYear()}` : '';

        // Monta labels "Cidade (IATA)" para origem e destino
        const originLabel = iataToCity[bestOffer.origin] || bestOffer.origin;
        const destinationLabel = iataToCity[bestOffer.destination] || bestOffer.destination;

        await emailProvider.send({
          subject: 'Nova oferta encontrada',
          to: user.email,
          template: 'RadarNotificationTemplate',
          context: {
            username: user.fullname?.split(' ')[0],
            origin: originLabel,
            destination: destinationLabel,
            date: formattedDate,
            price: `${bestOffer.type === 'MONEY' ? 'R$' : ''} ${bestOffer.value} ${bestOffer.type === 'AIRMILES' ? 'milhas$' : ''}`,
          },
        });
      }

      await pushProvider.sendPushNotification({
        userId: radar.userId,
        title: `Oferta: ${bestOffer.origin} -> ${bestOffer.destination} por ${bestOffer.value}!`,
        message: `Oferta: ${bestOffer.origin} -> ${bestOffer.destination} por ${bestOffer.value}!`,
        data: { offer: bestOffer },
      });
    }
  }

  console.log('Rotina diária de radar executada ao meio dia.');
});
