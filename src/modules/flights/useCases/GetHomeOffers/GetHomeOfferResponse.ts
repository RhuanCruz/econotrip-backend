type ContinentOvreview = {
  origin: string;
  destination: string;
  date: string;
  price: number;
};

type GetHomeOfferResponse = {
  general: Array<ContinentOvreview>;
  europe: Array<ContinentOvreview>;
  southAmerica: Array<ContinentOvreview>;
  middleAmerica: Array<ContinentOvreview>;
  northAmerica: Array<ContinentOvreview>;
  asia: Array<ContinentOvreview>;
  others: Array<ContinentOvreview>;
}

export { GetHomeOfferResponse };
