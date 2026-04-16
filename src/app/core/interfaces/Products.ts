export interface Products {
  id: string;
  prodId: string;
  prodImg: string;
  prodTitle: string;
  prodDescretion: string;
  prodOldPrice: number;
  prodPrice: number;
  prodDec: number;
  prodCategory: string;
  prodAva: string;
  isPopular: boolean;
  isAdded: boolean;
  isNew: boolean;
}

export interface ICart {
  id: string;
  userId: string;
  prodId: string;
}
