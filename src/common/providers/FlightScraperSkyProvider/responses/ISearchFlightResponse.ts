interface ISearchFlightResponse {
    data: {
    context: {
      status: string;
      sessionId: string;
      totalResults: number;
    };
    itineraries: Array<{
      id: string;
      price: {
        raw: number;
        formatted: string;
        pricingOptionId: string;
      };
      legs: {
        id: string;
        origin: {
          id: string;
          name: string;
          displayCode: string;
          city: string;
          country: string;
          isHighlighted: boolean;
        };
        destination: {
          id: string;
          name: string;
          displayCode: string;
          city: string;
          country: string;
          isHighlighted: boolean;
        };
        durationInMinutes: number;
        stopCount: number;
        isSmallestStops: boolean;
        departure: string;
        arrival: string;
        timeDeltaInDays: number;
        carriers: {
          marketing: {
            id: number;
            logoUrl: string;
            name: string;
          }[];
          operationType: string;
        };
        segments: {
          id: string;
          origin: {
            flightPlaceId: string;
            displayCode: string;
            parent?: {
              flightPlaceId: string;
              displayCode: string;
              name: string;
              type: string;
            };
            name: string;
            type: string;
          };
          destination: {
            flightPlaceId: string;
            displayCode: string;
            parent?: {
              flightPlaceId: string;
              displayCode: string;
              name: string;
              type: string;
            };
            name: string;
            type: string;
          };
          departure: string;
          arrival: string;
          durationInMinutes: number;
          flightNumber: string;
          marketingCarrier: {
            id: number;
            name: string;
            alternateId: string;
            allianceId: number;
            displayCode: string;
          };
          operatingCarrier: {
            id: number;
            name: string;
            alternateId: string;
            allianceId: number;
            displayCode: string;
          };
        }[];
      }[];
      isSelfTransfer: boolean;
      isProtectedSelfTransfer: boolean;
      farePolicy: {
        isChangeAllowed: boolean;
        isPartiallyChangeable: boolean;
        isCancellationAllowed: boolean;
        isPartiallyRefundable: boolean;
      };
      fareAttributes: Record<string, any>;
      tags: string[];
      isMashUp: boolean;
      hasFlexibleOptions: boolean;
      score: number;
    }>;
    messages: any[];
    filterStats: {
      duration: {
        min: number;
        max: number;
        multiCityMin: number;
        multiCityMax: number;
      };
      airports: {
        city: string;
        airports: {
          id: string;
          name: string;
        }[];
      }[];
      carriers: {
        id: number;
        logoUrl: string;
        name: string;
      }[];
      stopPrices: {
        direct: {
          isPresent: boolean;
        };
        one: {
          isPresent: boolean;
          formattedPrice?: string;
        };
        twoOrMore: {
          isPresent: boolean;
          formattedPrice?: string;
        };
      };
    };
    flightsSessionId: string;
    destinationImageUrl: string;
    token: string;
  };
  status: boolean;
  message: string;
}

export default ISearchFlightResponse;
