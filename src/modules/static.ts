import { FetchClient } from '../core/fetchClient';
import { CityDto, DistrictDto, NeighborhoodDto, TaxOfficeDto } from '../types/static';

export class StaticModule {
  constructor(private client: FetchClient) {}

  /**
   * Türkiye genelindeki 81 ili listeler
   */
  async getCities(): Promise<{ status: string; data: CityDto[] }> {
    return this.client.get<{ status: string; data: CityDto[] }>('/v1/static/cities');
  }

  /**
   * Belirtilen ile ait ilçeleri listeler
   */
  async getDistricts(cityId: string): Promise<{ status: string; data: DistrictDto[] }> {
    return this.client.get<{ status: string; data: DistrictDto[] }>(`/v1/static/districts/${cityId}`);
  }

  /**
   * Belirtilen ilçeye ait mahalleleri listeler
   */
  async getNeighborhoods(districtId: string): Promise<{ status: string; data: NeighborhoodDto[] }> {
    return this.client.get<{ status: string; data: NeighborhoodDto[] }>(`/v1/static/neighborhoods/${districtId}`);
  }

  /**
   * İl kodu veya plaka bazında bağlı vergi dairelerini / mal müdürlüklerini listeler.
   * Opsiyonel district parametresi ile ilçe araması yapılabilir.
   */
  async getTaxOffices(cityId: string, district?: string): Promise<{ status: string; data: TaxOfficeDto[] }> {
    const query = district ? `?district=${encodeURIComponent(district)}` : '';
    return this.client.get<{ status: string; data: TaxOfficeDto[] }>(`/v1/static/tax-administration/${cityId}${query}`);
  }
}

