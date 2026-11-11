export type FormPurpose =
  | 'STANDARD'
  | 'MERCHANT_APPLICATION'
  | 'BRAND_APPLICATION'
  | 'ORGANIZATION_APPLICATION'
  | 'SURVEY';

export type FormSubmissionStatus =
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED';

export type FormFieldType =
  | 'TEXT'
  | 'NUMBER'
  | 'TEXTAREA'
  | 'SELECT'
  | 'RADIO'
  | 'CHECKBOX'
  | 'DATE'
  | 'FILE'
  | 'EMAIL'
  | 'PHONE'
  | 'URL'
  | 'SECTION'
  | 'OBJECT';

export interface FormFieldValidationDto {
  min?: number;
  max?: number;
  regex?: string;
  maxSize?: number;
  accept?: string;
}

export interface CustomFormFieldDto {
  id: string;
  name: string;
  label: string;
  type: FormFieldType | string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  validation?: FormFieldValidationDto;
  mappedAttributeId?: string; // Direct link to Attribute schema
  nestedFields?: CustomFormFieldDto[];
}

export interface CustomFormActionsDto {
  autoApprove?: boolean;
  notifyEmails?: string[];
  createEntityOnApproval?: boolean;
  onApproval?: {
    createEntity?: 'MERCHANT' | 'BRAND' | 'ORGANIZATION' | 'USER';
    assignRole?: string;
  };
}

export interface CustomFormDto {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  purpose: FormPurpose;
  fields: CustomFormFieldDto[];
  actions?: CustomFormActionsDto;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormSubmissionAnswerDto {
  fieldId: string;
  fieldName: string;
  fieldLabel: string;
  value: unknown;
  mappedAttributeId?: string;
}

export interface FormSubmissionDto {
  _id: string;
  form: string | CustomFormDto;
  user?: string;
  status: FormSubmissionStatus;
  answers: Record<string, unknown> | FormSubmissionAnswerDto[];
  statusHistory?: Array<{
    status: FormSubmissionStatus;
    updatedBy?: string;
    updatedAt: string;
    note?: string;
  }>;
  submittedAt: string;
  processedAt?: string;
  processedBy?: string;
}

export interface FormSubmissionDetailDto extends FormSubmissionDto {
  logs?: Array<{
    _id: string;
    action: string;
    details?: string;
    performedBy?: string;
    createdAt: string;
  }>;
}

export interface FormStatisticsDto {
  totalSubmissions: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  conversionRate?: number;
}

export interface SubmissionLogDto {
  _id: string;
  submissionId: string;
  action: string;
  details?: Record<string, unknown> | string;
  performedBy?: string;
  createdAt: string;
}

export interface CreateCustomFormPayload {
  title: string;
  slug?: string;
  description?: string;
  purpose: FormPurpose;
  fields: CustomFormFieldDto[];
  actions?: CustomFormActionsDto;
  isActive?: boolean;
}

export interface UpdateCustomFormPayload {
  title?: string;
  slug?: string;
  description?: string;
  purpose?: FormPurpose;
  fields?: CustomFormFieldDto[];
  actions?: CustomFormActionsDto;
  isActive?: boolean;
}

export interface FormPaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

