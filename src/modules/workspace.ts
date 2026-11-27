import type { AvciFetchClient } from '../core/fetchClient';
import { CONTENT_LANGUAGE_HEADER } from '../core/fetchClient';

interface GenericClient {
  GET: (
    url: string,
    init?: { headers?: Record<string, string> }
  ) => Promise<{ data?: unknown; error?: unknown }>;
}

export class WorkspaceModule {
  constructor(private readonly client: AvciFetchClient) {}

  private buildHeaders(language?: string): Record<string, string> | undefined {
    return language ? { [CONTENT_LANGUAGE_HEADER]: language } : undefined;
  }

  /**
   * Get public workspace theme & branding settings.
   */
  async getSettings<T = unknown>(language?: string) {
    const genericClient = this.client as unknown as GenericClient;
    return genericClient.GET('/v1/workspace/theme', {
      headers: this.buildHeaders(language),
    }) as Promise<{ data?: T; error?: unknown }>;
  }

  /**
   * Get workspace public menus.
   */
  async getMenus<T = unknown>(language?: string) {
    const genericClient = this.client as unknown as GenericClient;
    return genericClient.GET('/v1/menu', {
      headers: this.buildHeaders(language),
    }) as Promise<{ data?: T; error?: unknown }>;
  }
}
