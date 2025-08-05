interface RadarResult {
  _id: string;
  origin: string;
  destination: string;
  continent: string;
  type: string;
  date: string;
  value: number;
  createdAt: string;
  __v: number;
}

interface ListResultsByContinentResponse {
  results: RadarResult[];
}

export default ListResultsByContinentResponse;
