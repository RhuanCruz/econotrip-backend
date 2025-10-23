interface ICreateFeedbackDTO {
  userId: number;
  category: 'BUG' | 'FEATURE_REQUEST' | 'IMPROVEMENT' | 'GENERAL' | 'COMPLIMENT' | 'COMPLAINT' | 'OTHER';
  subject: string;
  message: string;
  rating?: number;
  email?: string;
  attachments?: string[];
  userAgent?: string;
  ipAddress?: string;
}

export default ICreateFeedbackDTO;
