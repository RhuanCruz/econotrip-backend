interface ISearchCitiesDTO {
  name_startsWith: string;
  lang?: string;
  maxRows?: number;
  username: string;
  featureClass?: string;
  featureCode?: string[];
}

export default ISearchCitiesDTO;
