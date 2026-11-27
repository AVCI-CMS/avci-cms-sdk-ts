export interface UserAddressDto {
  addressId?: string;
  id?: string;
  title: string;
  receiver: string;
  phone: string;
  city: string;
  district: string;
  neighborhood?: string;
  address: string;
  zipCode?: string;
  isPrimary?: boolean;
  type?: 'individual' | 'corporate';
  taxOffice?: string;
  taxNumber?: string;
  companyName?: string;
}

export interface CreateAddressPayload {
  title: string;
  receiver: string;
  phone: string;
  city: string;
  district: string;
  neighborhood?: string;
  address: string;
  zipCode?: string;
  isPrimary?: boolean;
  type?: 'individual' | 'corporate';
  taxOffice?: string;
  taxNumber?: string;
  companyName?: string;
}

export interface UpdateAddressPayload {
  title?: string;
  receiver?: string;
  phone?: string;
  city?: string;
  district?: string;
  neighborhood?: string;
  address?: string;
  zipCode?: string;
  isPrimary?: boolean;
  type?: 'individual' | 'corporate';
  taxOffice?: string;
  taxNumber?: string;
  companyName?: string;
}

