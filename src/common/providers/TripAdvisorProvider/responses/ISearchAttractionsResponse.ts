interface Attraction {
  id: string;
  name: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  category: string;
  address?: string;
  website?: string;
  phone?: string;
  imageUrl?: string;
  priceRange?: string;
  openingHours?: {
    [key: string]: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  tags?: string[];
}

interface ISearchAttractionsResponse {
  cityName: string;
  totalResults: number;
  attractions: Attraction[];
  searchTimestamp: string;
}

export default ISearchAttractionsResponse;
export { Attraction };
