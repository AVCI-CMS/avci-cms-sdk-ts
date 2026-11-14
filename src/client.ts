import { createFetchClient, type AvciCMSConfig, type AvciFetchClient } from './core/fetchClient';
import { ContentModule } from './modules/content';
import { WorkspaceModule } from './modules/workspace';
import { ShipmentModule } from './modules/shipment';
import { AttributeModule } from './modules/attribute';
import { CustomFormModule } from './modules/customForm';
import { BasketModule } from './modules/basket';
import { OrderModule } from './modules/order';

export type { AvciCMSConfig };
export * from './modules/shipment';
export * from './modules/attribute';
export * from './modules/customForm';
export * from './modules/basket';
export * from './modules/order';
export * from './types/attribute';
export * from './types/customForm';
export * from './types/basket';
export * from './types/order';

export class AvciCMS {
  private readonly client: AvciFetchClient;
  
  public readonly content: ContentModule;
  public readonly workspace: WorkspaceModule;
  public readonly shipment: ShipmentModule;
  public readonly attribute: AttributeModule;
  public readonly customForm: CustomFormModule;
  public readonly basket: BasketModule;
  public readonly order: OrderModule;

  constructor(config: AvciCMSConfig) {
    this.client = createFetchClient(config);
    
    // Initialize modules
    this.content = new ContentModule(this.client);
    this.workspace = new WorkspaceModule(this.client);
    this.shipment = new ShipmentModule(this.client);
    this.attribute = new AttributeModule(this.client);
    this.customForm = new CustomFormModule(this.client);
    this.basket = new BasketModule(this.client);
    this.order = new OrderModule(this.client);
  }
}
