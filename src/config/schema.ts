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
  geonames: Zod.object({
    url: Zod.string().url(),
    username: Zod.string(),
  }),
  tripadvisor: Zod.object({
    apiKey: Zod.string().optional(),
    baseUrl: Zod.string().url().default('https://api.content.tripadvisor.com'),
  }),
  googlePlaces: Zod.object({
    apiKey: Zod.string(),
    baseUrl: Zod.string().url().default('https://maps.googleapis.com/maps/api/place'),
  }),
  radarRoutines: Zod.object({
    url: Zod.string(),
  }),
  flightScraperSky: Zod.object({
    url: Zod.string(),
    apiKey: Zod.string(),
  }),
  email: Zod.object({
    host: Zod.string(),
    port: Zod.string().transform(Number),
    secure: Zod.boolean(),
    name: Zod.string(),
    from: Zod.string(),
    auth: Zod.object({
      user: Zod.string(),
      pass: Zod.string(),
    }),
    authMethod: Zod.string(),
    requireTLS: Zod.boolean(),
    tls: Zod.object({
      rejectUnauthorized: Zod.boolean(),
      ciphers: Zod.string().default('HIGH:MEDIUM:!aNULL:!eNULL:@STRENGTH:!DH:!kEDH'),
    }),
  }),
  links: Zod.object({
    forgotPassword: Zod.string(),
  }),
  firebase: Zod.object({
    projectId: Zod.string(),
    privateKeyId: Zod.string(),
    privateKey: Zod.string(),
    clientId: Zod.string(),
    clientEmail: Zod.string(),
  }),
  twilio: Zod.object({
    accountSid: Zod.string(),
    authToken: Zod.string(),
    smsFrom: Zod.string(),
    whatsappFrom: Zod.string(),
  }),
});

export default ConfigSchema;
