export interface ProductDetails {
  totalAmountOfLoan: number;
  term: number;
  weeklyInstallment: number;
  lastWeeklyInstallment: number;
  totalFee: number;
  interest: number;
  handlingFee: number;
  adminFee: number;
  totalDueAmount: number;
  apr: number;
  productCategory: string;
}

export interface ProductDetailsContainer {
  [issueValue: string]: ProductDetails;
}

export interface ProductContainer {
  [productCategory: string]: ProductDetailsContainer;
}
