interface ICreateUserActionLogDTO {
  actionId: number;
  userId: number;
  timestamp: Date;
  ip: string;
  payload: object;
}

export default ICreateUserActionLogDTO;
