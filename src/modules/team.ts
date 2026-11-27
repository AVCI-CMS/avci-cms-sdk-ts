import { FetchClient } from '../core/fetchClient';
import { TeamMemberDto } from '../types/team';

export class TeamModule {
  constructor(private client: FetchClient) {}

  /**
   * Kurumsal vitrindeki aktif ekip üyelerini listeler
   */
  async list(params?: { page?: number; limit?: number; lg?: string }): Promise<{ status: string; data: TeamMemberDto[] }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.lg) searchParams.set('lg', params.lg);

    const query = searchParams.toString();
    return this.client.get<{ status: string; data: TeamMemberDto[] }>(`/v1/team${query ? `?${query}` : ''}`);
  }

  /**
   * Slug üzerinden ekip üyesi detayını getirir
   */
  async getBySlug(slug: string, lg?: string): Promise<{ status: string; data: TeamMemberDto }> {
    const query = lg ? `?lg=${lg}` : '';
    return this.client.get<{ status: string; data: TeamMemberDto }>(`/v1/team/${slug}${query}`);
  }

  /**
   * ID üzerinden ekip üyesi detayını getirir
   */
  async getById(id: string): Promise<{ status: string; data: TeamMemberDto }> {
    return this.client.get<{ status: string; data: TeamMemberDto }>(`/v1/team/id/${id}`);
  }
}

