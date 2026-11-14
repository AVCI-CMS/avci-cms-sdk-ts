export interface PlaceAddressDto {
  title?: string;
  country?: string;
  city?: string;
  district?: string;
  neighborhood?: string;
  street?: string;
  buildingNumber?: string;
  doorNumber?: string;
  postalCode?: string;
  formattedAddress?: string;
  location?: {
    type?: string;
    coordinates?: [number, number];
  };
  latitude?: number;
  longitude?: number;
}

export interface PlaceCapacityDto {
  min?: number;
  max?: number;
}

export interface PlaceWorkingHoursDto {
  day: number;
  hours: {
    start: string;
    end: string;
  };
}

export interface PlacePricingDto {
  isPaid: boolean;
  pricingType?: 'HOURLY' | 'DAILY' | 'FIXED' | 'PER_EVENT';
  amount?: number;
  currency?: string;
}

export interface PlaceProfileDto {
  _id: string;
  name: string;
  slug: string;
  abstract?: string;
  description?: string;
  logo?: { _id: string; path: string } | string;
  coverImage?: { _id: string; path: string } | string;
  featuredImage?: { _id: string; path: string } | string;
  gallery?: Array<{ _id: string; path: string } | string>;
  capacity?: PlaceCapacityDto;
  working?: PlaceWorkingHoursDto[];
  pricing?: PlacePricingDto;
  address?: PlaceAddressDto;
  area?: Array<{ _id: string; name: string; slug: string }> | string[];
  color?: string;
  status?: string;
  attributes?: Record<string, unknown>[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PlaceShortDto {
  _id: string;
  name: string;
  slug: string;
  abstract?: string;
  logo?: { _id: string; path: string } | string;
  featuredImage?: { _id: string; path: string } | string;
  capacity?: PlaceCapacityDto;
  address?: PlaceAddressDto;
  pricing?: PlacePricingDto;
  color?: string;
}

export interface PlaceListQuery {
  page?: number;
  limit?: number;
  area?: string;
  search?: string;
  status?: string;
}
