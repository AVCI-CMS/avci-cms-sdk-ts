export interface OrganizationProfileDto {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  biography?: string;
  logo?: { _id: string; path: string } | string;
  coverImage?: { _id: string; path: string } | string;
  gallery?: Array<{ _id: string; path: string } | string>;
  attributes?: Record<string, unknown>;
  socialMedia?: Record<string, string>;
  address?: Record<string, unknown>;
  status?: string;
}

export interface UpdateOrganizationMePayload {
  logo?: string;
  image?: string;
  coverImage?: string;
  cover?: string;
  description?: string;
  biography?: string;
  attributes?: Record<string, unknown>;
  gallery?: string[];
  socialMedia?: Record<string, string>;
  address?: Record<string, unknown>;
}

