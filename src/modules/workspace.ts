import type { AvciFetchClient } from '../core/fetchClient';

export class WorkspaceModule {
  constructor(private readonly client: AvciFetchClient) {}

  /**
   * Get workspace settings and info
   */
  async getSettings() {
    // client.GET('/v1/workspace/settings')
    return { data: null, error: null };
  }

  /**
   * Get workspace menus
   */
  async getMenus() {
    // client.GET('/v1/menus')
    return { data: [], error: null };
  }
}
