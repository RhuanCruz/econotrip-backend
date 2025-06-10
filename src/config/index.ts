import ConfigSchema from './schema';

const Config = ConfigSchema.parse({
  api: {
    host: process.env.API_HOST,
    port: process.env.API_PORT ?? process.env.PORT,
  },
  logger: {
    enabled: process.env.LOGS_ENABLED,
    level: process.env.LOGS_LEVEL,
    logToConsole: process.env.LOGS_CONSOLE_TRANSPORT,
    logToFiles: process.env.LOGS_FILE_TRANSPORT,
    logToFilesPath: process.env.LOGS_FILE_PATH,
  },
  auth: {
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECERT,
    accessTokenExp: process.env.AUTH_ACCESS_TOKEN_EXP,
    refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECERT,
    refreshTokenExp: process.env.AUTH_REFRESH_TOKEN_EXP,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    logging: process.env.DATABASE_LOGGING,
    ssl: process.env.DATABASE_SSL,
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  amadeus: {
    url: process.env.AMADEUS_API_URL,
    key: process.env.AMADEUS_API_KEY,
    secret: process.env.AMADEUS_API_SECRET,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  storage: {
    flightsData: process.env.STORAGE_OVERVIEW_FLIGHTS_BASE_PATH,
  },
  serpapi: {
    apiKey: process.env.SERPAPI_KEY,
  },
  seatsaero: {
    url: process.env.SEATSAERO_URL,
    apiKey: process.env.SEATSAERO_API_KEY,
  },
});

export default Config;
