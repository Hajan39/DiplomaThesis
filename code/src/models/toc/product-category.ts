export interface ProductCategory {
  termType: "WE" | "MO";
  term: number;
  name: string;
  key: string;
}

interface ProductCategories {
  [key: string]: ProductCategory[];
}
