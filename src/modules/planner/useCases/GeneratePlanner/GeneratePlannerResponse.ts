export type GeneratePlannerResponse = {
  destination: string;
  startDate: string;
  endDate: string;
  currency: string;
  totalEstimatedCost: number;
  days: Array<{
    day: number;
    date: string;
    activities: Array<{
      id: number;
      time: string;
      title: string;
      duration: string;
      description: string;
      estimatedCost: number;
    }>;
  }>;
};
