import { FetchClient } from '../core/fetchClient';
import { PlaceListQuery, PlaceProfileDto, PlaceShortDto } from '../types/place';

export class PlaceModule {
  constructor(private client: FetchClient) {}

  /**
   * Vitrindeki aktif mekanları listeler
   */
  async list(params?: PlaceListQuery): Promise<{ status: string; data: PlaceProfileDto[] }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.area) searchParams.set('area', params.area);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.status) searchParams.set('status', params.status);

    const query = searchParams.toString();
    return this.client.get<{ status: string; data: PlaceProfileDto[] }>(`/v1/place${query ? `?${query}` : ''}`);
  }

  /**
   * Slug ile mekan detayını getirir
   */
  async getBySlug(slug: string): Promise<{ status: string; data: PlaceProfileDto }> {
    return this.client.get<{ status: string; data: PlaceProfileDto }>(`/v1/place/${slug}`);
  }

  /**
   * ID ile mekan detayını getirir
   */
  async getById(id: string): Promise<{ status: string; data: PlaceProfileDto }> {
    return this.client.get<{ status: string; data: PlaceProfileDto }>(`/v1/place/id/${id}`);
  }

  /**
   * Slug ile özet mekan kartı bilgisini getirir
   */
  async getShortBySlug(slug: string): Promise<{ status: string; data: PlaceShortDto }> {
    return this.client.get<{ status: string; data: PlaceShortDto }>(`/v1/place/short/${slug}`);
  }
}
