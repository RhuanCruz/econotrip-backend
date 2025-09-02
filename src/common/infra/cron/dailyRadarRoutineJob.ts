import cron from 'node-cron';
import { AppContainer } from '@src/common/container';
import Types from '@src/common/container/types';
import IRadarRepository from '@modules/radar/repositories/IRadarRepository';
import IRadarRoutineProvider from '@common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';
import { IPushNotificationProvider } from '@common/providers/PushNotificationProvider';

// Agenda para rodar todo dia ao meio dia
cron.schedule('0 12 * * *', async () => {
  const radarRepository = AppContainer.get<IRadarRepository>(Types.RadarRepository);
  const radarRoutineProvider = AppContainer.get<IRadarRoutineProvider>(Types.RadarRoutineProvider);
  const pushProvider = AppContainer.get<IPushNotificationProvider>(Types.PushNotificationProvider);

  // Buscar todos os radares ativos
  const activeRadars = await radarRepository.list({});

  for (const radar of activeRadars) {
    const result = await radarRoutineProvider.listResults({ origin: radar.origin, destination: radar.destination, type: radar.type as 'MONEY' | 'AIRMILES' });
    if (result && result.results && result.results.length > 0) {
      // Calcula a melhor oferta (menor valor)
      const bestOffer = result.results.reduce((min, curr) => (curr.value < min.value ? curr : min), result.results[0]);
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
