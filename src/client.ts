import { createFetchClient, type AvciCMSConfig, type AvciFetchClient } from './core/fetchClient';
import { ContentModule } from './modules/content';
import { WorkspaceModule } from './modules/workspace';
import { ShipmentModule } from './modules/shipment';

export type { AvciCMSConfig };
export * from './modules/shipment';

export class AvciCMS {
  private readonly client: AvciFetchClient;
  
  public readonly content: ContentModule;
  public readonly workspace: WorkspaceModule;
  public readonly shipment: ShipmentModule;

  constructor(config: AvciCMSConfig) {
    this.client = createFetchClient(config);
    
    // Initialize modules
    this.content = new ContentModule(this.client);
    this.workspace = new WorkspaceModule(this.client);
    this.shipment = new ShipmentModule(this.client);
  }
}
