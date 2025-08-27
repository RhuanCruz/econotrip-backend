interface IListLocation2Response {
  data: {
    PlaceId: string;
    PlaceName: string;
    LocalizedPlaceName: string;
    CountryId: string;
    CityId: string;
    IataCode: string;
    CountryName: string;
    PlaceNameEn: string;
    RegionId: string;
    CityName: string;
    CityNameEn: string;
    GeoId: string;
    GeoContainerId: string;
    Location: string;
    ResultingPhrase: string;
    UntransliteratedResultingPhrase: string;
    Highlighting: number[][];
  }[];
  status: boolean;
  message: string;
}

export default IListLocation2Response;
