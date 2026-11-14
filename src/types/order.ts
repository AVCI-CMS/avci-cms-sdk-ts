export type OrderStatus =
  | 'WAITING'
  | 'PENDING_PAYMENT'
  | 'PREPARING'
  | 'ON_SHIPMENT'
  | 'DONE'
  | 'REFUNDED'
  | 'CANCELED';

export interface OrderItemPrice {
  sale: number;
  list?: number;
  currency: string;
}

export interface OrderItemDto {
  _id: string;
  name: string;
  image?: string;
  quantity: number;
  unit?: string;
  price: OrderItemPrice;
  type?: 'product' | 'event' | 'route';
  product?: string;
  event?: string;
  route?: string;
  merchant?: {
    _id: string;
    name: string;
  };
  brand?: {
    _id: string;
    name: string;
  };
}

export interface OrderAddressDto {
  title?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  phone?: string;
}

export interface OrderAttendeeDto {
  basketItemId?: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  identityNumber?: string;
  ticketNumber?: string;
  qrHash?: string;
}

export interface OrderPaymentDto {
  currency: string;
  paidAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  installment?: number;
}

export interface OrderShipmentDto {
  provider?: string;
  trackingNumber?: string;
  barcode?: string;
  fee?: {
    amount: number;
    currency: string;
  };
}

export interface SubOrderDto {
  _id: string;
  subOrderId: string;
  status: OrderStatus;
  items: OrderItemDto[];
  payment?: OrderPaymentDto;
  shipment?: OrderShipmentDto;
  merchant?: {
    _id: string;
    name: string;
  };
  brand?: {
    _id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderDto {
  _id: string;
  orderId: string;
  date: string;
  status: OrderStatus;
  items: OrderItemDto[];
  subOrders?: SubOrderDto[];
  addresses: {
    shipment: OrderAddressDto;
    billing: OrderAddressDto;
  };
  payment: OrderPaymentDto;
  attendees?: OrderAttendeeDto[];
  subscriptionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderParticipantInput {
  basketItemId: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface CreateOrderPayload {
  basketId: string;
  paymentMethod: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'WALLET' | string;
  addresses: {
    shipmentAddressId: string;
    billingAddressId: string;
  };
  card?: {
    cardHolderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
    cvc: string;
    saveCard?: boolean;
  };
  cardId?: string;
  installment?: number;
  participants?: OrderParticipantInput[];
}

export interface InstallmentQueryPayload {
  binNumber: string;
  price: number;
}

export interface InstallmentOptionDto {
  bankName: string;
  cardType: string;
  installmentPrices: {
    installmentNumber: number;
    totalPrice: number;
    installmentPrice: number;
  }[];
}

export interface SavedCardDto {
  _id: string;
  cardUserKey: string;
  cardToken: string;
  cardAlias: string;
  binNumber: string;
  cardType: string;
  cardAssociation: string;
  cardFamily: string;
  cardBankName?: string;
}

export interface SaveCardPayload {
  cardAlias: string;
  cardHolderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
}

