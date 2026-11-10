import type { AvciFetchClient } from '../core/fetchClient';

export interface ReturnRequestItem {
  _id: string;
  name?: string;
  quantity?: number;
  reason?: string;
}

export interface RequestReturnPayload {
  subOrderId?: string;
  orderId?: string;
  reason?: string;
  items?: ReturnRequestItem[];
  images?: string[];
  note?: string;
}

export interface ReturnStatusData {
  orderId: string;
  subOrderId: string;
  status: string;
  returnTrackingNumber?: string;
  returnBarcode?: string;
  returnShipment?: unknown;
  updatedAt?: string;
}

export interface ReturnStatusResponse {
  success: boolean;
  data?: ReturnStatusData;
  message?: string;
}

export class ShipmentModule {
  constructor(private readonly client: AvciFetchClient) {}

  /**
   * Request a return (RMA) for an order or sub-order (End-User / Storefront)
   * Calls POST /v1/shipment/rma/request
   */
  async requestReturn(payload: RequestReturnPayload) {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST('/v1/shipment/rma/request', {
        body: payload,
      });
    }
    return { data: null, error: null };
  }

  /**
   * Get return status and tracking details for a sub-order
   * Calls GET /v1/shipment/rma/{subOrderId}/status
   */
  async getReturnStatus(subOrderId: string) {
    if (typeof (this.client as any).GET === 'function') {
      return (this.client as any).GET(`/v1/shipment/rma/${subOrderId}/status`);
    }
    return { data: null, error: null };
  }

  /**
   * Approve a return request and generate carrier tracking code / barcode (Admin / Merchant)
   * Calls POST /v1/shipment/rma/{subOrderId}/approve
   */
  async approveReturn(subOrderId: string, provider?: string) {
    if (typeof (this.client as any).POST === 'function') {
      return (this.client as any).POST(`/v1/shipment/rma/${subOrderId}/approve`, {
        body: { provider },
      });
    }
    return { data: null, error: null };
  }
}

