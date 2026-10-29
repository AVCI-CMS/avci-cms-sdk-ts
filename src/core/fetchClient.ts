import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from '../schema';

export interface AvciCMSConfig {
  apiKey: string;
  projectId?: string;
  clientId?: string;
  baseUrl?: string;
}

export function createFetchClient(config: AvciCMSConfig) {
  const baseUrl = config.baseUrl || 'https://api.avcicms.com/v1';

  const client = createClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }: { request: Request }) {
      request.headers.set('Authorization', `Bearer ${config.apiKey}`);
      request.headers.set('x-avci-api-key', config.apiKey);
      const clientIdentifier = config.clientId || config.projectId;
      if (clientIdentifier) {
        request.headers.set('x-avci-client', clientIdentifier);
        request.headers.set('x-project-id', clientIdentifier);
      }
      return request;
    },
    async onResponse({ response }: { response: Response }) {
      // openapi-fetch natively returns { data, error }.
      // Here we can intercept and log or transform specific HTTP errors if needed.
      return response;
    }
  };

  client.use(authMiddleware);

  return client;
}

export type AvciFetchClient = ReturnType<typeof createFetchClient>;
