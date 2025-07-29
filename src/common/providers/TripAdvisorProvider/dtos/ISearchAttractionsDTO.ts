interface ISearchAttractionsDTO {
  cityName: string;
  limit?: number;
  category?: 'all' | 'attractions' | 'restaurants' | 'hotels';
  sortBy?: 'popularity' | 'rating' | 'distance';
}

export default ISearchAttractionsDTO;
