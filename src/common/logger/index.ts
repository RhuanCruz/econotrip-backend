import 'winston-daily-rotate-file';
import Winston from 'winston';
import Path from 'path';
import Config from '@src/config';

const format = Winston.format.combine(
  Winston.format.colorize({ all: true }),
  Winston.format.timestamp({ format: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) }),
  Winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const fileTransports = [
  new Winston.transports.DailyRotateFile({
    filename: Path.resolve(Config.logger.logToFilesPath, 'warns-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    level: 'warn',
    zippedArchive: true,
    maxSize: '20m’',
    maxFiles: '14d',
  }),
  new Winston.transports.DailyRotateFile({
    filename: Path.resolve(Config.logger.logToFilesPath, 'errors-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    level: 'error',
    zippedArchive: true,
    maxSize: '20m’',
    maxFiles: '14d',
  }),
  new Winston.transports.DailyRotateFile({
    filename: Path.resolve(Config.logger.logToFilesPath, 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m’',
    maxFiles: '14d',
  }),
];

const Logger = Winston.createLogger({
  level: Config.logger.level,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  format,
  transports: [
    new Winston.transports.Console(),
    ...(Config.logger.logToFiles ? fileTransports : []),
  ],
  silent: !Config.logger.enabled,
});

Winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'white',
  http: 'white',
  debug: 'white',
});

export default Logger;
