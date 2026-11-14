import type { AvciFetchClient } from '../core/fetchClient';
import type {
  BasketDto,
  CreateBasketPayload,
  AddBasketItemInput,
  BasketQuantityAction,
  UpdateBasketPayload,
} from '../types/basket';

export class BasketModule {
  constructor(private readonly client: AvciFetchClient) {}

  /**
   * Create a new shopping basket
   * Calls POST /v1/basket
   */
  async create(
    payload?: CreateBasketPayload
  ): Promise<{ data: BasketDto | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST('/v1/basket', {
        body: payload || {},
      });
    }
    return { data: null, error: null };
  }

  /**
   * Get basket by ID
   * Calls GET /v1/basket/:basketId
   */
  async get(
    basketId: string
  ): Promise<{ data: BasketDto | null; error: unknown }> {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/basket/${basketId}`);
    }
    return { data: null, error: null };
  }

  /**
   * Update basket metadata, coupons, or addresses
   * Calls PUT /v1/basket/:basketId
   */
  async update(
    basketId: string,
    payload: UpdateBasketPayload
  ): Promise<{ data: BasketDto | null; error: unknown }> {
    if (typeof (this.client as any).PUT === 'function') {
      return (this.client as any).PUT(`/v1/basket/${basketId}`, {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * Clear all items from basket
   * Calls DELETE /v1/basket/:basketId
   */
  async clear(
    basketId: string
  ): Promise<{ data: { success: boolean } | null; error: unknown }> {
    if (typeof (this.client as any).DELETE === 'function') {
      return (this.client as any).DELETE(`/v1/basket/${basketId}`);
    }
    return { data: null, error: null };
  }

  /**
   * Add items (products, events, routes) to basket
   * Calls POST /v1/basket/add/:basketId
   */
  async addItems(
    basketId: string,
    items: AddBasketItemInput[]
  ): Promise<{ data: BasketDto | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST(`/v1/basket/add/${basketId}`, {
        body: { items },
      });
    }
    return { data: null, error: null };
  }

  /**
   * Increase, decrease, or remove a specific line item
   * Calls PUT /v1/basket/update/:basketId/:itemId/:action
   */
  async updateQuantity(
    basketId: string,
    itemId: string,
    action: BasketQuantityAction
  ): Promise<{ data: BasketDto | null; error: unknown }> {
    if (typeof (this.client as any).PUT === 'function') {
      return (this.client as any).PUT(
        `/v1/basket/update/${basketId}/${itemId}/${action}`
      );
    }
    return { data: null, error: null };
  }

  /**
   * Change active currency for basket prices
   * Calls PUT /v1/basket/currency/:basketId
   */
  async changeCurrency(
    basketId: string,
    currency: string
  ): Promise<{ data: BasketDto | null; error: unknown }> {
    if (typeof (this.client as any).PUT === 'function') {
      return (this.client as any).PUT(`/v1/basket/currency/${basketId}`, {
        body: { currency },
      });
    }
    return { data: null, error: null };
  }

  /**
   * Prepare preliminary information and distance sale agreements for the current basket
   * Calls POST /v1/basket/terms/
   */
  async prepareTerms(
    basketId: string
  ): Promise<{ data: { distanceSaleAgreement: string; preliminaryInformationForm: string } | null; error: unknown }> {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST('/v1/basket/terms/', {
        body: { basketId },
      });
    }
    return { data: null, error: null };
  }
}

