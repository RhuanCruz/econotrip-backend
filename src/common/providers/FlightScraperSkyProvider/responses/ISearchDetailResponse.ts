interface ISearchDetailResponse {
  data: {
    itinerary: {
      id: string;
      legs: {
        id: string;
        origin: {
          id: string;
          name: string;
          displayCode: string;
          city: string;
        };
        destination: {
          id: string;
          name: string;
          displayCode: string;
          city: string;
        };
        segments: {
          id: string;
          origin: {
            id: string;
            name: string;
            displayCode: string;
            city: string;
          };
          destination: {
            id: string;
            name: string;
            displayCode: string;
            city: string;
          };
          duration: number;
          dayChange: number;
          flightNumber: string;
          departure: string;
          arrival: string;
          marketingCarrier: {
            id: string;
            name: string;
            displayCode: string;
            displayCodeType: string;
            logo: string;
            altId: string;
            brandColor?: string;
          };
          operatingCarrier: {
            id: string;
            name: string;
            displayCode: string;
            displayCodeType: string;
            logo: string;
            altId: string;
            brandColor?: string;
          };
          goodToKnowItems: {
            icon: string;
            body: {
              value: string;
              isHighlighted: boolean;
              position: number;
            };
            badge?: {
              value: string;
              isHighlighted: boolean;
              position: number;
            };
            date?: {
              value: string;
              isHighlighted: boolean;
              position: number;
            };
          }[];
        }[];
        layovers: {
          segmentId: string;
          origin: {
            id: string;
            name: string;
            displayCode: string;
            city: string;
          };
          destination: {
            id: string;
            name: string;
            displayCode: string;
            city: string;
          };
          duration: number;
        }[];
        duration: number;
        stopCount: number;
        departure: string;
        arrival: string;
        dayChange: number;
      }[];
      pricingOptions: {
        agents: {
          id: string;
          name: string;
          isCarrier: boolean;
          bookingProposition: string;
          url: string;
          price: number;
          rating: {
            value: number;
            count: number;
          };
          updateStatus: string;
          segments: {
            id: string;
            origin: {
              id: string;
              name: string;
              displayCode: string;
              city: string;
            };
            destination: {
              id: string;
              name: string;
              displayCode: string;
              city: string;
            };
            duration: number;
            dayChange: number;
            flightNumber: string;
            departure: string;
            arrival: string;
            marketingCarrier: {
              id: string;
              name: string;
              displayCode: string;
              displayCodeType: string;
              logo: string;
              altId: string;
              brandColor?: string;
            };
            operatingCarrier: {
              id: string;
              name: string;
              displayCode: string;
              displayCodeType: string;
              logo: string;
              altId: string;
              brandColor?: string;
            };
            goodToKnowItems: {
              icon: string;
              body: {
                value: string;
                isHighlighted: boolean;
                position: number;
              };
              badge?: {
                value: string;
                isHighlighted: boolean;
                position: number;
              };
              date?: {
                value: string;
                isHighlighted: boolean;
                position: number;
              };
            }[];
          }[];
          transferProtection: string;
          isDirectDBookUrl: boolean;
          quoteAge: number;
        }[];
        totalPrice: number;
        fare: {
          leg_details: any[];
        };
        id: string;
      }[];
      isTransferRequired: boolean;
      destinationImage: string;
      operatingCarrierSafetyAttributes: {
        carrierID: string;
        carrierName: string;
        faceMasksCompulsory: null | boolean;
        aircraftDeepCleanedDaily: null | boolean;
        attendantsWearPPE: null | boolean;
        cleaningPacksProvided: null | boolean;
        foodServiceChanges: null | boolean;
        safetyUrl: null | string;
      }[];
      flexibleTicketPolicies: any[];
      transferProtectionDetails: {
        title: string;
        body: string;
        url: string;
        urlTitle: string;
      };
    };
    pollingCompleted: boolean;
    bookingSessionId: string;
  };
  status: boolean;
  message: string;
}

export default ISearchDetailResponse;
