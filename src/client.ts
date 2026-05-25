import { createFetchClient, type AvciCMSConfig, type AvciFetchClient } from './core/fetchClient';
import { ContentModule } from './modules/content';
import { WorkspaceModule } from './modules/workspace';

export type { AvciCMSConfig };

export class AvciCMS {
  private readonly client: AvciFetchClient;
  
  public readonly content: ContentModule;
  public readonly workspace: WorkspaceModule;

  constructor(config: AvciCMSConfig) {
    this.client = createFetchClient(config);
    
    // Initialize modules
    this.content = new ContentModule(this.client);
    this.workspace = new WorkspaceModule(this.client);
  }
}
