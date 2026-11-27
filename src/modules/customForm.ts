import type { AvciFetchClient } from '../core/fetchClient';
import type {
  CustomFormDto,
  CreateCustomFormPayload,
  UpdateCustomFormPayload,
  FormSubmissionDto,
  FormSubmissionDetailDto,
  FormSubmissionStatus,
  FormStatisticsDto,
  SubmissionLogDto,
  FormPaginatedResponse,
} from '../types/customForm';

export class CustomFormModule {
  constructor(private readonly client: AvciFetchClient) {}

  // ==========================================
  // Public / Storefront Methods
  // ==========================================

  /**
   * Get public form schema for dynamic rendering
   * Calls GET /v1/customForm/:formId
   */
  async getSchema(formId: string): Promise<{ data: CustomFormDto | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/customForm/${formId}`);
    }
    return { data: null, error: null };
  }

  /**
   * Submit form answers from storefront
   * Calls POST /v1/customForm/submit/:formId
   */
  async submit(
    formId: string,
    values: Record<string, unknown>
  ): Promise<{ data: { submissionId: string; status: FormSubmissionStatus } | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST(`/v1/customForm/submit/${formId}`, {
        body: values,
      });
    }
    return { data: null, error: null };
  }

  /**
   * Check if current user has already submitted this form
   * Calls GET /v1/customForm/has-submission/:formId
   */
  async hasSubmitted(
    formId: string
  ): Promise<{ data: { hasSubmitted: boolean; submissionId?: string } | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/customForm/has-submission/${formId}`);
    }
    return { data: null, error: null };
  }

  // ==========================================
  // Management / Console Methods
  // ==========================================

  /**
   * List custom forms with pagination
   * Calls GET /v1/customForm
   */
  async list(query?: { page?: number; limit?: number }): Promise<{ data: FormPaginatedResponse<CustomFormDto> | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      const searchParams = new URLSearchParams();
      if (query?.page) searchParams.set('page', String(query.page));
      if (query?.limit) searchParams.set('limit', String(query.limit));
      const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
      return (this.client as any).GET(`/v1/customForm${queryStr}`);
    }
    return { data: null, error: null };
  }

  /**
   * Get single form details by ID (management)
   * Calls GET /v1/customForm/:formId
   */
  async get(formId: string): Promise<{ data: CustomFormDto | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/customForm/${formId}`);
    }
    return { data: null, error: null };
  }

  /**
   * Create a new custom form
   * Calls POST /v1/customForm
   */
  async create(payload: CreateCustomFormPayload): Promise<{ data: CustomFormDto | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST('/v1/customForm', {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * Update an existing custom form
   * Calls PUT /v1/customForm/:formId
   */
  async update(formId: string, payload: UpdateCustomFormPayload): Promise<{ data: CustomFormDto | null; error: unknown }> {
    if (typeof (this.client as any).PUT === 'function') {
      return (this.client as any).PUT(`/v1/customForm/${formId}`, {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * Delete a custom form
   * Calls DELETE /v1/customForm/:formId
   */
  async delete(formId: string): Promise<{ data: { success: boolean } | null; error: unknown }> {
    if (typeof (this.client as any).DELETE === 'function') {
      return (this.client as any).DELETE(`/v1/customForm/${formId}`);
    }
    return { data: null, error: null };
  }

  /**
   * Get submissions for a custom form
   * Calls GET /v1/customForm/:formId/submissions
   */
  async getSubmissions(
    formId: string,
    query?: { status?: FormSubmissionStatus; page?: number; limit?: number }
  ): Promise<{ data: FormPaginatedResponse<FormSubmissionDto> | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      const searchParams = new URLSearchParams();
      if (query?.status) searchParams.set('status', query.status);
      if (query?.page) searchParams.set('page', String(query.page));
      if (query?.limit) searchParams.set('limit', String(query.limit));
      const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
      return (this.client as any).GET(`/v1/customForm/${formId}/submissions${queryStr}`);
    }
    return { data: null, error: null };
  }

  /**
   * Get submission detail for review workspace
   * Calls GET /v1/customForm/:formId/submissions/:subId
   */
  async getSubmissionDetail(
    formId: string,
    subId: string
  ): Promise<{ data: FormSubmissionDetailDto | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/customForm/${formId}/submissions/${subId}`);
    }
    return { data: null, error: null };
  }

  /**
   * Update submission status (e.g. PENDING -> UNDER_REVIEW -> REJECTED)
   * Calls PUT /v1/customForm/:formId/submissions/:subId/status
   */
  async updateSubmissionStatus(
    formId: string,
    subId: string,
    status: FormSubmissionStatus,
    note?: string
  ): Promise<{ data: FormSubmissionDto | null; error: unknown }> {
    if (typeof (this.client as any).PUT === 'function') {
      return (this.client as any).PUT(`/v1/customForm/${formId}/submissions/${subId}/status`, {
        body: { status, note },
      });
    }
    return { data: null, error: null };
  }

  /**
   * Process approval actions (e.g. automatically provision merchant/brand/organization)
   * Calls POST /v1/customForm/submissions/:submissionId/process
   */
  async processApproval(
    submissionId: string,
    actionPayload?: Record<string, unknown>
  ): Promise<{ data: { success: boolean; entityId?: string } | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST(`/v1/customForm/submissions/${submissionId}/process`, {
        body: actionPayload || {},
      });
    }
    return { data: null, error: null };
  }

  /**
   * Get submission statistics and conversion metrics
   * Calls GET /v1/customForm/:formId/statistics
   */
  async getStatistics(formId: string): Promise<{ data: FormStatisticsDto | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/customForm/${formId}/statistics`);
    }
    return { data: null, error: null };
  }

  /**
   * Get activity logs for a specific submission
   * Calls GET /v1/customForm/:submissionId/logs
   */
  async getSubmissionLogs(submissionId: string): Promise<{ data: SubmissionLogDto[] | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/customForm/${submissionId}/logs`);
    }
    return { data: null, error: null };
  }
}

