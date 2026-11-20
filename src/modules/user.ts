import { FetchClient } from '../core/fetchClient';
import { UserAddressDto, CreateAddressPayload, UpdateAddressPayload } from '../types/user';

export class UserModule {
  constructor(private client: FetchClient) {}

  /**
   * Kullanıcının kayıtlı teslimat ve fatura adreslerini listeler
   */
  async getAddresses(): Promise<{ status: string; data: UserAddressDto[] | null }> {
    return this.client.get<{ status: string; data: UserAddressDto[] | null }>('/v1/user/address/');
  }

  /**
   * Yeni adres ekler
   */
  async addAddress(payload: CreateAddressPayload): Promise<{ status: string; data: unknown }> {
    return this.client.post<{ status: string; data: unknown }>('/v1/user/address/', payload);
  }

  /**
   * Belirtilen adresi günceller (isPrimary: true gönderildiğinde varsayılan adres olarak atanır)
   */
  async updateAddress(
    addressId: string,
    payload: UpdateAddressPayload
  ): Promise<{ status: string; data?: UserAddressDto[] }> {
    return this.client.put<{ status: string; data?: UserAddressDto[] }>(`/v1/user/address/${addressId}`, payload);
  }

  /**
   * Adresi doğrudan tekil varsayılan teslimat adresi olarak ayarlar
   */
  async setPrimaryAddress(addressId: string): Promise<{ status: string; data: UserAddressDto[] }> {
    return this.client.put<{ status: string; data: UserAddressDto[] }>(`/v1/user/address/${addressId}/primary`, {});
  }

  /**
   * Belirtilen adresi siler
   */
  async deleteAddress(addressId: string): Promise<{ status: string }> {
    return this.client.delete<{ status: string }>(`/v1/user/address/${addressId}`);
  }
}

