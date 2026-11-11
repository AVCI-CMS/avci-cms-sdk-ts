import type { AvciFetchClient } from '../core/fetchClient';
import type {
  AttributeEntityType,
  AttributeDto,
  AttributeShortDto,
  SourceOptionDto,
  CreateAttributePayload,
  UpdateAttributePayload,
  AttributePaginatedResponse,
} from '../types/attribute';

export class AttributeModule {
  constructor(private readonly client: AvciFetchClient) {}

  /**
   * Get public attributes list for a specific entity type (e.g. for storefront filtering)
   * Calls GET /v1/attribute/:type
   */
  async getPublicList(type: AttributeEntityType): Promise<{ data: AttributeDto[] | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/attribute/${type}`);
    }
    return { data: null, error: null };
  }

  /**
   * Get dynamic options for SOURCE type attributes
   * Calls GET /v1/attribute/:type/source-options
   */
  async getSourceOptions(type: AttributeEntityType): Promise<{ data: SourceOptionDto[] | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/attribute/${type}/source-options`);
    }
    return { data: null, error: null };
  }

  /**
   * List paginated attributes for management console
   * Calls GET /v1/attribute/:type
   */
  async list(
    type: AttributeEntityType,
    query?: { page?: number; limit?: number; search?: string }
  ): Promise<{ data: AttributePaginatedResponse | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      const searchParams = new URLSearchParams();
      if (query?.page) searchParams.set('page', String(query.page));
      if (query?.limit) searchParams.set('limit', String(query.limit));
      if (query?.search) searchParams.set('search', query.search);
      const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
      return (this.client as any).GET(`/v1/attribute/${type}${queryStr}`);
    }
    return { data: null, error: null };
  }

  /**
   * Get simplified attribute list for form / select dropdowns
   * Calls GET /v1/attribute/:type/list
   */
  async listForForm(type: AttributeEntityType): Promise<{ data: AttributeShortDto[] | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/attribute/${type}/list`);
    }
    return { data: null, error: null };
  }

  /**
   * Get single attribute by ID
   * Calls GET /v1/attribute/:type/:id
   */
  async getById(type: AttributeEntityType, id: string): Promise<{ data: AttributeDto | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/attribute/${type}/${id}`);
    }
    return { data: null, error: null };
  }

  /**
   * Check if attribute key is available
   * Calls GET /v1/attribute/:type/check?key=...
   */
  async checkKey(type: AttributeEntityType, key: string): Promise<{ data: { available: boolean } | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/attribute/${type}/check?key=${encodeURIComponent(key)}`);
    }
    return { data: null, error: null };
  }

  /**
   * Create a new attribute definition
   * Calls POST /v1/attribute/:type
   */
  async create(type: AttributeEntityType, payload: CreateAttributePayload): Promise<{ data: AttributeDto | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST(`/v1/attribute/${type}`, {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * Update an existing attribute definition
   * Calls PUT /v1/attribute/:type/:id
   */
  async update(type: AttributeEntityType, id: string, payload: UpdateAttributePayload): Promise<{ data: AttributeDto | null; error: unknown }> {
    if (typeof (this.client as any).PUT === 'function') {
      return (this.client as any).PUT(`/v1/attribute/${type}/${id}`, {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * Delete an attribute definition
   * Calls DELETE /v1/attribute/:type/:id
   */
  async delete(type: AttributeEntityType, id: string): Promise<{ data: { success: boolean } | null; error: unknown }> {
    if (typeof (this.client as any).DELETE === 'function') {
      return (this.client as any).DELETE(`/v1/attribute/${type}/${id}`);
    }
    return { data: null, error: null };
  }

  /**
   * Bulk delete multiple attributes
   * Calls DELETE /v1/attribute/:type/bulk
   */
  async bulkDelete(type: AttributeEntityType, ids: string[]): Promise<{ data: { deletedCount: number } | null; error: unknown }> {
    if (typeof (this.client as any).DELETE === 'function') {
      return (this.client as any).DELETE(`/v1/attribute/${type}/bulk`, {
        body: { ids },
      });
    }
    return { data: null, error: null };
  }

  /**
   * Bulk update status for multiple attributes
   * Calls PUT /v1/attribute/:type/bulk/status
   */
  async bulkUpdateStatus(
    type: AttributeEntityType,
    ids: string[],
    status: 'ACTIVE' | 'PASSIVE'
  ): Promise<{ data: { updatedCount: number } | null; error: unknown }> {
    if (typeof (this.client as any).PUT === 'function') {
      return (this.client as any).PUT(`/v1/attribute/${type}/bulk/status`, {
        body: { ids, status },
      });
    }
    return { data: null, error: null };
  }
}

