interface ICreateRadarDTO {
  userId: number;
  start?: string;
  end?: string;
  origin: string;
  destination: string;
  type: string;
  value?: number;
  airline?: string;
  tripType?: 'ONE_WAY' | 'ROUND_TRIP';
  returnDateRange?: number;
}

export default ICreateRadarDTO;
