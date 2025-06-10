import Config from '@src/config';
import SwaggerJson from './swagger.json';

const SwaggerOptions = {
  ...SwaggerJson,
  openapi: '3.0.3',
  info: {
    title: 'Econotrip Backend',
    version: '1.0.0.',
    description: 'Econotrip Backend',
    hots: `${Config.api.host}/api/v1`,
  },
  servers: [{
    url: `${Config.api.host}/api/v1`,
    description: 'Server',
  }],

};

SwaggerOptions.components.securitySchemes = {
  BearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'BearerAuthtentication',
  },
  BasicAuth: {
    type: 'http',
    scheme: 'basic',
  },
};

export default SwaggerOptions;
