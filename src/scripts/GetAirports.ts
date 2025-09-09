/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { parse } from 'csv-parse';
import axios from 'axios';
import fs from 'fs';

import { AppContainer } from '@src/common/container';
import ILocationRepository from '@src/modules/location/repositories/ILocationRepository';
import LocationRepository from '@src/modules/location/infra/database/repositories/LocationRepository';

interface AiportRaw {
  id: string;
  ident: string;
  type: string;
  name: string;
  latitude_deg: string;
  longitude_deg: string;
  elevation_ft: string;
  continent: string;
  iso_country: string;
  iso_region: string;
  municipality: string;
  scheduled_service: string;
  icao_code: string;
  iata_code: string;
  gps_code: string;
  local_code: string;
  home_link: string;
  wikipedia_link: string;
  keywords: string;
}

const locationRepository = AppContainer.resolve<ILocationRepository>(LocationRepository);

const nameToSlug = (name: string) => name
  .normalize('NFD') // Decompose accented characters
  .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
  .toUpperCase() // Convert to uppercase
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/[^A-Z0-9-]/g, ''); // Remove any other special characters

const translate = async (text: string): Promise<string> => {
  const response = await axios.post('http://localhost:6000/translate', {
    q: text,
    source: 'en',
    target: 'pt',
  }).catch(() => {
    console.log('Failed to translate: ', text);
  });

  return response?.data?.translatedText ?? text;
};

const processRow = async (data: AiportRaw) => {
  console.log(`processing ${data.iata_code} - ${data.municipality}`);

  const translatedName = await translate(data.name);
  const translatedCityName = await translate(data.municipality);

  await locationRepository.upsert({
    name: translatedName,
    cityCode: nameToSlug(data.municipality),
    cityName: translatedCityName,
    iata: data.iata_code,
    country: data.iso_country,
    timezone: null,
    type: null,
    cordinateLon: null,
    cordinateLat: null,
    createdAt: new Date(),
  });
};

const main = () => {
  const airports: AiportRaw[] = [];

  fs.createReadStream('airports.csv')
    .pipe(parse({ columns: true }))
    .on('data', async (data: AiportRaw) => {
      if (!['medium_airport', 'large_airport'].includes(data.type)) return;
      if (!data.iata_code || data.iata_code.trim() === '') return;

      airports.push(data);
    })
    .on('end', async () => {
      for (const airport of airports) {
        await processRow(airport);
      }
    });
};

main();
