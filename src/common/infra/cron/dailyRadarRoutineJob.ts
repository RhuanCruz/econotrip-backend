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

// Agenda para rodar todo dia ao meio dia
cron.schedule('0 12 * * *', async () => {
  const radarRepository = AppContainer.get<IRadarRepository>(Types.RadarRepository);
  const radarRoutineProvider = AppContainer.get<IRadarRoutineProvider>(Types.RadarRoutineProvider);
  const pushProvider = AppContainer.get<IPushNotificationProvider>(Types.PushNotificationProvider);
  // const messageProvider = AppContainer.get<IMessageRepository>(Types.MessageProvider);
  const userRepository = AppContainer.get<IUserRepository>(Types.UserRepository);
  const emailProvider = AppContainer.get<IEmailProvider>(Types.EmailProvider);

  // Buscar todos os radares ativos
  const activeRadars = await radarRepository.list({});

  const users = new Set<number>();

  for (const radar of activeRadars) {
    const result = await radarRoutineProvider.listResults({ origin: radar.origin, destination: radar.destination, type: radar.type as 'MONEY' | 'AIRMILES' });
    if (result && result.results && result.results.length > 0) {
      if (users.has(radar.userId)) continue;
      users.add(radar.userId);

      const bestOffer = result.results.reduce((min, curr) => (curr.value < min.value ? curr : min), result.results[0]);

      const user = await userRepository.findById(radar.userId);
      let userPhone = user?.phone;

      if (userPhone && !userPhone.startsWith('+')) {
        userPhone = `+55${userPhone.replace(/^0+/, '')}`;
      }

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

        await emailProvider.send({
          subject: 'Nova oferta encontrada',
          to: user.email,
          template: 'RadarNotificationTemplate',
          context: {
            username: user.fullname?.split(' ')[0],
            origin: bestOffer.origin,
            destination: bestOffer.destination,
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
