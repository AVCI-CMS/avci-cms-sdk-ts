import { FetchClient } from '../core/fetchClient';
import { MerchantProfileDto, UpdateMerchantMePayload } from '../types/merchant';

export class MerchantModule {
  constructor(private client: FetchClient) {}

  /**
   * Zanaatkar / Satıcının kendi vitrin profilini getirir (/profil/sayfam)
   */
  async getMe(): Promise<{ status: string; data: MerchantProfileDto }> {
    return this.client.get<{ status: string; data: MerchantProfileDto }>('/v1/merchant/me');
  }

  /**
   * Zanaatkar / Satıcının kendi vitrin profilini günceller (logo, kapak, biyografi, nitelikler, galeri)
   */
  async updateMe(payload: UpdateMerchantMePayload): Promise<{ status: string; data: MerchantProfileDto }> {
    return this.client.put<{ status: string; data: MerchantProfileDto }>('/v1/merchant/me', payload);
  }

  /**
   * Vitrindeki aktif mağazaları/satıcıları listeler
   */
  async list(params?: { page?: number; limit?: number; search?: string }): Promise<{ status: string; data: MerchantProfileDto[] }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);

    const query = searchParams.toString();
    return this.client.get<{ status: string; data: MerchantProfileDto[] }>(`/v1/merchant${query ? `?${query}` : ''}`);
  }

  /**
   * Slug ile mağaza detayını getirir
   */
  async getBySlug(slug: string): Promise<{ status: string; data: MerchantProfileDto }> {
    return this.client.get<{ status: string; data: MerchantProfileDto }>(`/v1/merchant/${slug}`);
  }
}

