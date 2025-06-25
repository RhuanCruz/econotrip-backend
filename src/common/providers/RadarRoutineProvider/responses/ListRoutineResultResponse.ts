interface ListRoutineResultResponse {
  results: Array<{
      _id: string;
      origin: string;
      destination: string;
      type: 'MONEY' | 'AIRMILES';
      date: string;
      value: number;
      createdAt: string;
      __v: number;
  }>;
}

export default ListRoutineResultResponse;
