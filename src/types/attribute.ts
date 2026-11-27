export type AttributeEntityType =
  | 'product'
  | 'project'
  | 'event'
  | 'merchant'
  | 'brand'
  | 'organization'
  | 'place';

export type AttributeDataType =
  | 'STRING'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'DATE'
  | 'SELECT'
  | 'MULTISELECT'
  | 'SOURCE'
  | 'OBJECT';

export interface AttributeOptionDto {
  label: string;
  value: string;
  color?: string;
  isDefault?: boolean;
}

export interface AttributeValidationDto {
  min?: number;
  max?: number;
  regex?: string;
  options?: AttributeOptionDto[];
}

export interface AttributeSourceConfigDto {
  entityType: string;
  filterQuery?: Record<string, unknown>;
}

export interface AttributeDto {
  _id: string;
  type: AttributeDataType;
  key: string;
  label: string;
  description?: string;
  entityType?: AttributeEntityType;
  isRequired?: boolean;
  isFilterable?: boolean;
  options?: AttributeOptionDto[];
  sourceConfig?: AttributeSourceConfigDto;
  nestedFields?: AttributeDto[];
  unit?: string;
  status: 'ACTIVE' | 'PASSIVE';
  createdAt?: string;
  updatedAt?: string;
}

export interface AttributeShortDto {
  _id: string;
  label: string;
  key: string;
  type: AttributeDataType;
}

export interface NormalizedAttributeValue {
  attributeId: string;
  label?: string; // Legacy fallback
  key?: string;
  value: unknown;
  unit?: string;
}

export interface SourceOptionDto {
  label: string;
  value: string;
}

export interface CreateAttributePayload {
  type: AttributeDataType;
  key: string;
  label: string;
  description?: string;
  isRequired?: boolean;
  isFilterable?: boolean;
  options?: AttributeOptionDto[];
  sourceConfig?: AttributeSourceConfigDto;
  nestedFields?: AttributeDto[];
  unit?: string;
  status?: 'ACTIVE' | 'PASSIVE';
}

export interface UpdateAttributePayload {
  type?: AttributeDataType;
  label?: string;
  description?: string;
  isRequired?: boolean;
  isFilterable?: boolean;
  options?: AttributeOptionDto[];
  sourceConfig?: AttributeSourceConfigDto;
  nestedFields?: AttributeDto[];
  unit?: string;
  status?: 'ACTIVE' | 'PASSIVE';
}

export interface AttributePaginatedResponse {
  docs: AttributeDto[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

