import cron from 'node-cron';
import { dailyRadarRoutineJob } from './dailyRadarRoutineJob';

cron.schedule('30 9-20 * * *', dailyRadarRoutineJob, { timezone: 'America/Sao_Paulo' });
