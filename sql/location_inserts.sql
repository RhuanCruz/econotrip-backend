-- Inserção de dados de localizações (aeroportos)
-- Adaptado de airport_inserts.sql para a tabela location

BEGIN;

-- Principais aeroportos do Brasil
INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Guarulhos International Airport', 'BR', 'SAO', 'São Paulo', 'GRU', 'America/Sao_Paulo', 'AIRPORT', -46.481926, -23.425669);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Rio de Janeiro-Galeão International Airport', 'BR', 'RIO', 'Rio de Janeiro', 'GIG', 'America/Sao_Paulo', 'AIRPORT', -43.246948, -22.808903);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Congonhas Airport', 'BR', 'SAO', 'São Paulo', 'CGH', 'America/Sao_Paulo', 'AIRPORT', -46.655556, -23.626111);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Santos Dumont Airport', 'BR', 'RIO', 'Rio de Janeiro', 'SDU', 'America/Sao_Paulo', 'AIRPORT', -43.162056, -22.909444);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Brasília International Airport', 'BR', 'BSB', 'Brasília', 'BSB', 'America/Sao_Paulo', 'AIRPORT', -47.917221, -15.871111);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Confins International Airport', 'BR', 'BHZ', 'Belo Horizonte', 'CNF', 'America/Sao_Paulo', 'AIRPORT', -43.970833, -19.633056);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Pampulha Airport', 'BR', 'BHZ', 'Belo Horizonte', 'PLU', 'America/Sao_Paulo', 'AIRPORT', -43.950556, -19.851111);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Porto Alegre Airport', 'BR', 'POA', 'Porto Alegre', 'POA', 'America/Sao_Paulo', 'AIRPORT', -51.175833, -29.994444);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Recife Airport', 'BR', 'REC', 'Recife', 'REC', 'America/Recife', 'AIRPORT', -34.924722, -8.126389);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Salvador Airport', 'BR', 'SSA', 'Salvador', 'SSA', 'America/Bahia', 'AIRPORT', -38.331111, -12.910556);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Fortaleza Airport', 'BR', 'FOR', 'Fortaleza', 'FOR', 'America/Fortaleza', 'AIRPORT', -38.541667, -3.776111);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Curitiba Airport', 'BR', 'CWB', 'Curitiba', 'CWB', 'America/Sao_Paulo', 'AIRPORT', -49.174722, -25.535278);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Manaus Airport', 'BR', 'MAO', 'Manaus', 'MAO', 'America/Manaus', 'AIRPORT', -60.049444, -3.038333);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Belém Airport', 'BR', 'BEL', 'Belém', 'BEL', 'America/Belem', 'AIRPORT', -48.477222, -1.379722);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Florianópolis Airport', 'BR', 'FLN', 'Florianópolis', 'FLN', 'America/Sao_Paulo', 'AIRPORT', -48.547222, -27.673056);

-- Principais aeroportos internacionais
INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('John F. Kennedy International Airport', 'US', 'NYC', 'New York', 'JFK', 'America/New_York', 'AIRPORT', -73.778889, 40.639722);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Miami International Airport', 'US', 'MIA', 'Miami', 'MIA', 'America/New_York', 'AIRPORT', -80.290556, 25.795833);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Los Angeles International Airport', 'US', 'LAX', 'Los Angeles', 'LAX', 'America/Los_Angeles', 'AIRPORT', -118.408056, 33.9425);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('London Heathrow Airport', 'GB', 'LON', 'London', 'LHR', 'Europe/London', 'AIRPORT', -0.461389, 51.4775);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Paris Charles de Gaulle Airport', 'FR', 'PAR', 'Paris', 'CDG', 'Europe/Paris', 'AIRPORT', 2.547778, 49.009722);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Madrid Barajas Airport', 'ES', 'MAD', 'Madrid', 'MAD', 'Europe/Madrid', 'AIRPORT', -3.567778, 40.471944);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Lisbon Portela Airport', 'PT', 'LIS', 'Lisbon', 'LIS', 'Europe/Lisbon', 'AIRPORT', -9.135277, 38.774166);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Rome Fiumicino Airport', 'IT', 'ROM', 'Rome', 'FCO', 'Europe/Rome', 'AIRPORT', 12.238889, 41.804444);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Frankfurt Airport', 'DE', 'FRA', 'Frankfurt', 'FRA', 'Europe/Berlin', 'AIRPORT', 8.570556, 50.033333);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Amsterdam Schiphol Airport', 'NL', 'AMS', 'Amsterdam', 'AMS', 'Europe/Amsterdam', 'AIRPORT', 4.763889, 52.308056);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Toronto Pearson International Airport', 'CA', 'YTO', 'Toronto', 'YYZ', 'America/Toronto', 'AIRPORT', -79.630556, 43.676667);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Buenos Aires Ezeiza Airport', 'AR', 'BUE', 'Buenos Aires', 'EZE', 'America/Argentina/Buenos_Aires', 'AIRPORT', -58.535833, -34.822222);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Santiago International Airport', 'CL', 'SCL', 'Santiago', 'SCL', 'America/Santiago', 'AIRPORT', -70.785835, -33.393001);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Lima Jorge Chávez Airport', 'PE', 'LIM', 'Lima', 'LIM', 'America/Lima', 'AIRPORT', -77.114305, -12.021944);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Bogotá El Dorado Airport', 'CO', 'BOG', 'Bogotá', 'BOG', 'America/Bogota', 'AIRPORT', -74.146944, 4.701594);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Mexico City International Airport', 'MX', 'MEX', 'Mexico City', 'MEX', 'America/Mexico_City', 'AIRPORT', -99.072083, 19.436389);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Dubai International Airport', 'AE', 'DXB', 'Dubai', 'DXB', 'Asia/Dubai', 'AIRPORT', 55.364444, 25.252778);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Singapore Changi Airport', 'SG', 'SIN', 'Singapore', 'SIN', 'Asia/Singapore', 'AIRPORT', 103.989444, 1.350189);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Tokyo Narita International Airport', 'JP', 'TYO', 'Tokyo', 'NRT', 'Asia/Tokyo', 'AIRPORT', 140.385556, 35.764722);

INSERT INTO "location" ("name", "country_code", "city_code", "city_name", "iata_code", "timezone", "type", "cordinate_lon", "cordinate_lat") VALUES
('Hong Kong International Airport', 'HK', 'HKG', 'Hong Kong', 'HKG', 'Asia/Hong_Kong', 'AIRPORT', 113.914444, 22.308889);

COMMIT;
