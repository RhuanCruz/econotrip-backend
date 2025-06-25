import Zod from 'zod';

const ConfigSchema = Zod.object({
  api: Zod.object({
    host: Zod.string(),
    port: Zod.string().transform((port) => Number(port)),
  }),
  logger: Zod.object({
    enabled: Zod.string().transform((enabled) => enabled === 'true'),
    level: Zod.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
    logToConsole: Zod.string().transform((logToConsole) => logToConsole === 'true'),
    logToFiles: Zod.string().transform((logToFiles) => logToFiles === 'true'),
    logToFilesPath: Zod.string(),
  }),
  auth: Zod.object({
    accessTokenSecret: Zod.string(),
    accessTokenExp: Zod.string(),
    refreshTokenSecret: Zod.string(),
    refreshTokenExp: Zod.string(),
  }),
  database: Zod.object({
    host: Zod.string(),
    port: Zod.string().transform((port) => Number(port)),
    username: Zod.string(),
    password: Zod.string(),
    name: Zod.string(),
    logging: Zod.string().transform((logging) => logging === 'true'),
    ssl: Zod.string().transform((ssl) => ssl === 'true'),
  }),
  admin: Zod.object({
    email: Zod.string().email(),
    password: Zod.string().min(6),
  }),
  amadeus: Zod.object({
    url: Zod.string().url(),
    key: Zod.string(),
    secret: Zod.string(),
  }),
  openai: Zod.object({
    apiKey: Zod.string(),
  }),
  storage: Zod.object({
    flightsData: Zod.string(),
  }),
  serpapi: Zod.object({
    apiKey: Zod.string(),
  }),
  seatsaero: Zod.object({
    url: Zod.string(),
    apiKey: Zod.string(),
  }),
  radarRoutines: Zod.object({
    url: Zod.string(),
  }),
});

export default ConfigSchema;
