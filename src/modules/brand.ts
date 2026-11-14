import { FetchClient } from '../core/fetchClient';
import { BrandProfileDto, UpdateBrandMePayload } from '../types/brand';

export class BrandModule {
  constructor(private client: FetchClient) {}

  /**
   * Marka yetkilisinin kendi vitrin profilini getirir (/profil/sayfam)
   */
  async getMe(): Promise<{ status: string; data: BrandProfileDto }> {
    return this.client.get<{ status: string; data: BrandProfileDto }>('/v1/brand/me');
  }

  /**
   * Marka yetkilisinin kendi vitrin profilini günceller
   */
  async updateMe(payload: UpdateBrandMePayload): Promise<{ status: string; data: BrandProfileDto }> {
    return this.client.put<{ status: string; data: BrandProfileDto }>('/v1/brand/me', payload);
  }

  /**
   * Vitrindeki markaları listeler
   */
  async list(params?: { page?: number; limit?: number; search?: string }): Promise<{ status: string; data: BrandProfileDto[] }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);

    const query = searchParams.toString();
    return this.client.get<{ status: string; data: BrandProfileDto[] }>(`/v1/brand${query ? `?${query}` : ''}`);
  }

  /**
   * Slug ile marka detayını getirir
   */
  async getBySlug(slug: string): Promise<{ status: string; data: BrandProfileDto }> {
    return this.client.get<{ status: string; data: BrandProfileDto }>(`/v1/brand/${slug}`);
  }
}

