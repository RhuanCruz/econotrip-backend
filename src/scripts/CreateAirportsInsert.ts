/* eslint-disable camelcase */
import axios from 'axios';
import * as fs from 'fs';

// Interfaces para tipagem
interface Coordinates {
  lon: number;
  lat: number;
}

interface Airport {
  name_translations: {
    en: string;
  };
  name: string;
  country_code: string;
  city_code: string;
  time_zone: string;
  code: string;
  coordinates: Coordinates;
  type?: string;
  flightable?: boolean;
}

/**
 * Busca dados de aeroportos em português da API TravelPayouts
 * @returns {Promise<Airport[]>} Array com dados de aeroportos
 */
async function fetchAirportData(): Promise<Airport[]> {
  try {
    // Buscar apenas a versão em português
    const response = await axios.get<Airport[]>('https://api.travelpayouts.com/data/pt/airports.json');
    const airports = response.data;
    console.log(`Encontrados ${airports.length} aeroportos em português`);
    return airports;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
}

/**
 * Filtra apenas aeroportos que recebem voos
 * @param {Airport[]} airports - Lista de aeroportos
 * @returns {Airport[]} - Aeroportos filtrados
 */
function filterFlightableAirports(airports: Airport[]): Airport[] {
  // Remover aeroportos duplicados (pelo código)
  const uniqueAirports = airports.reduce((acc: Airport[], current: Airport) => {
    if (!acc.find((item) => item.code === current.code)) {
      acc.push(current);
    }
    return acc;
  }, [] as Airport[]);

  return uniqueAirports.filter((airport) => airport.flightable);
}

/**
 * Gera comandos SQL INSERT para os aeroportos
 * @param {Airport[]} airports - Lista de aeroportos filtrados
 * @returns {string} - Comandos SQL
 */
function generateInsertStatements(airports: Airport[]): string {
  let sql = '';

  // Cabeçalho
  sql += '-- Inserção de dados de aeroportos\n';
  sql += `-- Total de aeroportos: ${airports.length}\n\n`;

  // Iniciar transação
  sql += 'BEGIN;\n\n';

  // Gerar INSERT para cada aeroporto
  airports.forEach((airport, index) => {
    // Escapar strings para SQL
    const escapeName = (str: string | undefined): string => (str ? str.replace(/'/g, "''") : '');

    const name = escapeName(airport.name_translations.en);
    const { country_code } = airport;
    const { city_code } = airport;
    const { time_zone } = airport;
    const { code } = airport;
    const { lon } = airport.coordinates;
    const { lat } = airport.coordinates;

    sql += 'INSERT INTO "location" ("name", "country_code", "city_code", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES\n';
    sql += `('${name}', '${country_code}', '${city_code}', '${code}', '${time_zone}', 'AIRPORT', ${lon}, ${lat});\n`;

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
    console.log('Buscando dados de aeroportos em português...');
    const allAirports = await fetchAirportData();
    console.log(`Total de aeroportos encontrados: ${allAirports.length}`);

    // Verificar amostra para debug
    if (allAirports.length > 0) {
      console.log('\nExemplo de estrutura de aeroporto:');
      console.log(JSON.stringify(allAirports[0], null, 2));
    }

    // Filtrar aeroportos que recebem voos
    console.log('Filtrando aeroportos que recebem voos...');
    const flightableAirports = filterFlightableAirports(allAirports);
    console.log(`Aeroportos filtrados: ${flightableAirports.length}`);

    if (flightableAirports.length === 0) {
      console.log('AVISO: Nenhum aeroporto passou nos filtros. Verifique os critérios de filtragem.');
      return;
    }

    // Gerar SQL
    console.log(`Gerando SQL para ${flightableAirports.length} aeroportos...`);
    const sql = generateInsertStatements(flightableAirports);

    // Salvar SQL em arquivo
    const filename = 'airport_inserts.sql';
    fs.writeFileSync(filename, sql);

    console.log(`SQL gerado com sucesso! Arquivo salvo como ${filename}`);
    console.log(`Total de aeroportos processados: ${flightableAirports.length}`);
  } catch (error) {
    console.error('Erro:', error instanceof Error ? error.message : String(error));
  }
}

// Executar
main();
