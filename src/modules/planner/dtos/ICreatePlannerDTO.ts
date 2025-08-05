interface ICreatePlannerDTO {
  userId: number;
  start: string;
  end: string;
  destination: string[];
  content: any;
  current?: boolean;
  status?: string;
}

export default ICreatePlannerDTO;
