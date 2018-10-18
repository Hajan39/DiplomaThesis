import { ProductCategory } from "./product-category";
import { ProductContainer, ProductDetails, ProductDetailsContainer } from "./product-details";
import { ProductIssues } from "./product-issues";
import { ProductRates } from "./product-rates";

export interface ToCFormat {
  created: Date;
  hash: string;
  issues: ProductIssues;
  infos: ProductContainer;
  categories: ProductCategory;
  repay: ProductRates;
}
