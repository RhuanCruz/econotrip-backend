/* eslint-disable camelcase */
import axios from 'axios';
import * as fs from 'fs';

// Interface para tipagem de cidades
interface City {
  name_translations: {
    en: string;
  };
  name: string;
  code: string;
  country_code: string;
  coordinates?: {
    lon: number;
    lat: number;
  };
  time_zone?: string;
}

/**
 * Busca dados de cidades em português da API TravelPayouts
 * @returns {Promise<City[]>} Array com dados de cidades
 */
async function fetchCityData(): Promise<City[]> {
  try {
    const response = await axios.get<City[]>('https://api.travelpayouts.com/data/pt/cities.json');
    const cities = response.data;
    console.log(`Encontradas ${cities.length} cidades em português`);
    return cities;
  } catch (error) {
    console.error('Erro ao buscar dados de cidades:', error);
    throw error;
  }
}

/**
 * Filtra cidades para remover entradas incompletas ou duplicadas
 * @param {City[]} cities - Lista de cidades
 * @returns {City[]} - Cidades filtradas
 */
function filterCities(cities: City[]): City[] {
  // Remover cidades duplicadas pelo código
  const uniqueCities = cities.reduce((acc: City[], current: City) => {
    if (!acc.find((item) => item.code === current.code)) {
      acc.push(current);
    }
    return acc;
  }, [] as City[]);

  // Filtrar apenas cidades com todos os dados necessários
  return uniqueCities.filter((city) => city.name
    && city.code
    && city.country_code
    && city.coordinates
    && city.coordinates.lon
    && city.coordinates.lat);
}

/**
 * Gera comandos SQL INSERT para as cidades
 * @param {City[]} cities - Lista de cidades filtradas
 * @returns {string} - Comandos SQL
 */
function generateInsertStatements(cities: City[]): string {
  let sql = '';

  // Cabeçalho
  sql += '-- Inserção de dados de cidades\n';
  sql += `-- Total de cidades: ${cities.length}\n\n`;

  // Iniciar transação
  sql += 'BEGIN;\n\n';

  // Gerar INSERT para cada cidade
  cities.forEach((city, index) => {
    // Escapar strings para SQL
    const escapeName = (str: string): string => str.replace(/'/g, "''");

    const name = escapeName(city.name ?? city.name_translations.en);
    const { code } = city;
    const { country_code } = city;
    const lon = city.coordinates?.lon || 0;
    const lat = city.coordinates?.lat || 0;
    const timezone = city.time_zone || 'UTC';

    sql += 'INSERT INTO "location" ("name", "country_code", "city_code", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES\n';
    sql += `('${name}', '${country_code}', '${code}', null, '${timezone}', 'CITY', ${lon}, ${lat});\n`;

    // Adicionar uma linha em branco a cada 10 inserções para melhor legibilidade
    if ((index + 1) % 10 === 0) {
      sql += '\n';
    }
  });

  // Finalizar transação
  sql += '\nCOMMIT;\n';

  return sql;
}

/**
 * Função principal que processa tudo
 */
async function main(): Promise<void> {
  try {
    // Buscar dados
    console.log('Buscando dados de cidades em português...');
    const allCities = await fetchCityData();

    // Verificar amostra para debug
    if (allCities.length > 0) {
      console.log('\nExemplo de estrutura de cidade:');
      console.log(JSON.stringify(allCities[0], null, 2));
    }

    // Filtrar cidades
    console.log('Filtrando cidades...');
    const filteredCities = filterCities(allCities);
    console.log(`Cidades após filtragem: ${filteredCities.length}`);

    if (filteredCities.length === 0) {
      console.log('AVISO: Nenhuma cidade passou nos filtros. Verifique os critérios de filtragem.');
      return;
    }

    // Gerar SQL
    console.log(`Gerando SQL para ${filteredCities.length} cidades...`);
    const sql = generateInsertStatements(filteredCities);

    // Salvar SQL em arquivo
    const filename = 'city_inserts.sql';
    fs.writeFileSync(filename, sql);

    console.log(`SQL gerado com sucesso! Arquivo salvo como ${filename}`);
    console.log(`Total de cidades processadas: ${filteredCities.length}`);
  } catch (error) {
    console.error('Erro:', error instanceof Error ? error.message : String(error));
  }
}

// Executar
main();
