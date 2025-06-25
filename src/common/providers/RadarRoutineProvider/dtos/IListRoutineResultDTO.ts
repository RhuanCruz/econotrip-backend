interface IListRadarRoutineDTO {
  origin: string;
  destination: string;
  type: 'MONEY' | 'AIRMILES';
  periodStart: string;
  periodEnd: string;
}

export default IListRadarRoutineDTO;
