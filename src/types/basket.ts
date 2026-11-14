export type BasketItemType = 'product' | 'event' | 'route';

export interface BasketItemPrice {
  amount: number;
  currency: string;
  original?: number;
  discount?: number;
}

export interface BasketItemDto {
  _id: string;
  id: string;
  itemType: BasketItemType;
  name: string;
  slug?: string;
  quantity: number;
  price: BasketItemPrice;
  image?: string;
  variantId?: string;
  variantName?: string;
  merchant?: {
    _id: string;
    name: string;
  };
  brand?: {
    _id: string;
    name: string;
  };
  addedToBasketAt?: string;
}

export interface BasketPricingDto {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: string;
}

export interface BasketDto {
  _id: string;
  basketId: string;
  user?: string;
  items: BasketItemDto[];
  price: BasketPricingDto;
  coupon?: string;
  shippingAddressId?: string;
  billingAddressId?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface CreateBasketPayload {
  currency?: string;
}

export interface AddBasketItemInput {
  id: string;
  quantity: number;
  itemType: BasketItemType;
  variantId?: string;
}

export interface AddBasketItemsPayload {
  items: AddBasketItemInput[];
}

export type BasketQuantityAction = 'increase' | 'decrease' | 'delete';

export interface UpdateBasketPayload {
  coupon?: string;
  shippingAddressId?: string;
  billingAddressId?: string;
}

export interface ChangeCurrencyPayload {
  currency: string;
}

