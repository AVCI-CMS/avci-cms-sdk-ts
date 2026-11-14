import { FetchClient } from '../core/fetchClient';
import { OrganizationProfileDto, UpdateOrganizationMePayload } from '../types/organization';

export class OrganizationModule {
  constructor(private client: FetchClient) {}

  /**
   * Çatı Kurum yetkilisinin kendi vitrin profilini getirir (/profil/sayfam)
   */
  async getMe(): Promise<{ status: string; data: OrganizationProfileDto }> {
    return this.client.get<{ status: string; data: OrganizationProfileDto }>('/v1/organization/me');
  }

  /**
   * Çatı Kurum yetkilisinin kendi vitrin profilini günceller
   */
  async updateMe(payload: UpdateOrganizationMePayload): Promise<{ status: string; data: OrganizationProfileDto }> {
    return this.client.put<{ status: string; data: OrganizationProfileDto }>('/v1/organization/me', payload);
  }

  /**
   * Vitrindeki çatı kurumları listeler
   */
  async list(params?: { page?: number; limit?: number; search?: string }): Promise<{ status: string; data: OrganizationProfileDto[] }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);

    const query = searchParams.toString();
    return this.client.get<{ status: string; data: OrganizationProfileDto[] }>(`/v1/organization${query ? `?${query}` : ''}`);
  }

  /**
   * Slug ile çatı kurum detayını getirir
   */
  async getBySlug(slug: string): Promise<{ status: string; data: OrganizationProfileDto }> {
    return this.client.get<{ status: string; data: OrganizationProfileDto }>(`/v1/organization/${slug}`);
  }
}

