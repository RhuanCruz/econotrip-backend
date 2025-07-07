interface ICreateRadarDTO {
  userId: number;
  start: string;
  end: string;
  origin: string;
  destination: string;
  type: string;
  value: number;
}

export default ICreateRadarDTO;
