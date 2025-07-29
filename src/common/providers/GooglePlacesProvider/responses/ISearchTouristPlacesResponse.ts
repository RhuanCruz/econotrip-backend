interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  types: string[];
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now: boolean;
  };
  business_status?: string;
}

interface ISearchTouristPlacesResponse {
  results: GooglePlace[];
  status: string;
  next_page_token?: string;
  html_attributions: string[];
}

export default ISearchTouristPlacesResponse;
export { GooglePlace };
