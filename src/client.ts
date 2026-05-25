export interface AvciCMSConfig {
  apiKey: string;
  projectId: string;
  baseUrl?: string;
}

export class AvciCMS {
  private config: AvciCMSConfig;
  private baseUrl: string;

  constructor(config: AvciCMSConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.avcicms.com/v1';
  }

  // Placeholder for content fetching (Phase 1 automation will generate exact methods)
  public content(modelSlug: string) {
    return {
      findMany: async (options?: any) => {
        // Implementation will use this.baseUrl, this.config.apiKey
        console.log(`Fetching ${modelSlug} with options:`, options);
        return [];
      }
    };
  }
}
