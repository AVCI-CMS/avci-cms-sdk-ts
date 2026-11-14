import type { AvciFetchClient } from '../core/fetchClient';
import type {
  OrderDto,
  SubOrderDto,
  CreateOrderPayload,
  InstallmentQueryPayload,
  InstallmentOptionDto,
  SavedCardDto,
  SaveCardPayload,
} from '../types/order';

export class OrderModule {
  constructor(private readonly client: AvciFetchClient) {}

  // ==========================================
  // Storefront / Customer Operations
  // ==========================================

  /**
   * Finalize checkout and create an order from a prepared basket
   * When checking out ticket items (events/routes), provide participant details in `participants`.
   * Calls POST /v1/order
   */
  async create(
    payload: CreateOrderPayload
  ): Promise<{ data: OrderDto | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST('/v1/order', {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * List purchase history for authenticated customer
   * Calls GET /v1/order
   */
  async listCustomerOrders(
    params?: { page?: number; limit?: number; status?: string }
  ): Promise<{ data: OrderDto[] | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET('/v1/order', {
        params: { query: params },
      });
    }
    return { data: null, error: null };
  }

  /**
   * Get single order details for authenticated customer
   * Calls GET /v1/order/:orderId
   */
  async getCustomerOrder(
    orderId: string
  ): Promise<{ data: OrderDto | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/order/${orderId}`);
    }
    return { data: null, error: null };
  }

  /**
   * Query credit card installment rates by BIN number and basket total
   * Calls POST /v1/order/installment
   */
  async getInstallments(
    payload: InstallmentQueryPayload
  ): Promise<{ data: InstallmentOptionDto[] | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST('/v1/order/installment', {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * List stored payment cards for authenticated user
   * Calls GET /v1/order/saved-cards
   */
  async getSavedCards(): Promise<{ data: SavedCardDto[] | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET('/v1/order/saved-cards');
    }
    return { data: null, error: null };
  }

  /**
   * Store a payment card for one-click checkout
   * Calls POST /v1/order/saved-cards
   */
  async saveCard(
    payload: SaveCardPayload
  ): Promise<{ data: SavedCardDto | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST('/v1/order/saved-cards', {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * Delete a stored payment card
   * Calls DELETE /v1/order/saved-cards/:id
   */
  async deleteSavedCard(
    id: string
  ): Promise<{ data: { success: boolean } | null; error: unknown }> {
    if (typeof (this.client as any).DELETE === 'function') {
      return (this.client as any).DELETE(`/v1/order/saved-cards/${id}`);
    }
    return { data: null, error: null };
  }

  // ==========================================
  // Vendor / Merchant Operations (Isolated)
  // ==========================================

  /**
   * List assigned sub-orders for authenticated merchant/vendor
   * Calls GET /v1/order/vendor
   */
  async listVendorOrders(
    params?: { page?: number; limit?: number; status?: string }
  ): Promise<{ data: SubOrderDto[] | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET('/v1/order/vendor', {
        params: { query: params },
      });
    }
    return { data: null, error: null };
  }

  /**
   * Get single sub-order details for authenticated merchant/vendor
   * Calls GET /v1/order/vendor/:orderId
   */
  async getVendorOrder(
    orderId: string
  ): Promise<{ data: SubOrderDto | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/order/vendor/${orderId}`);
    }
    return { data: null, error: null };
  }
}

