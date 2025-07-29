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
  geonames: {
    url: process.env.GEONAMES_URL,
    username: process.env.GEONAMES_USERNAME,
  },
  tripadvisor: {
    apiKey: process.env.TRIPADVISOR_API_KEY,
    baseUrl: process.env.TRIPADVISOR_BASE_URL,
  },
  googlePlaces: {
    apiKey: process.env.GOOGLE_PLACES_API_KEY,
    baseUrl: process.env.GOOGLE_PLACES_BASE_URL,
  },
  radarRoutines: {
    url: process.env.RADAR_ROUTINE_URL,
  },
  flightScraperSky: {
    url: process.env.FLIGHT_SCRAPER_SKY_URL,
    apiKey: process.env.FLIGHT_SCRAPER_SKY_API_KEY,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_TLS === 'true',
    name: process.env.EMAIL_NAME,
    from: process.env.EMAIL_FROM,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    authMethod: process.env.EMAIL_AUTHENTICATION,
    requireTLS: true,
    tls: {
      rejectUnauthorized: false,
    },
  },
  links: {
    forgotPassword: process.env.LINK_FORGOT_PASSWORD,
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientId: process.env.FIREBASE_CLIENT_ID,
    clientEmail: process.env.FIREBASE_CLIENTE_EMAIL,
  },
});

export default Config;
