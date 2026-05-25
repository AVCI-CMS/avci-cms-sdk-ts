import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from '../schema';

export interface AvciCMSConfig {
  apiKey: string;
  projectId: string;
  baseUrl?: string;
}

export function createFetchClient(config: AvciCMSConfig) {
  const baseUrl = config.baseUrl || 'https://api.avcicms.com/v1';

  const client = createClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }) {
      request.headers.set('Authorization', `Bearer ${config.apiKey}`);
      if (config.projectId) {
        request.headers.set('x-project-id', config.projectId);
      }
      return request;
    },
    async onResponse({ response }) {
      // openapi-fetch natively returns { data, error }.
      // Here we can intercept and log or transform specific HTTP errors if needed.
      return response;
    }
  };

  client.use(authMiddleware);

  return client;
}

export type AvciFetchClient = ReturnType<typeof createFetchClient>;
