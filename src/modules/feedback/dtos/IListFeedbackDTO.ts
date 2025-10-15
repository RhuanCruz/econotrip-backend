interface IListFeedbackDTO {
  userId?: number;
  category?: string;
  status?: string;
  offset?: number;
  limit?: number;
}

export default IListFeedbackDTO;
