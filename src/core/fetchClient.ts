import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from '../schema';

export const AVCICMS_CLIENT_HEADER = 'x-avcicms-client' as const;
export const AVCICMS_API_KEY_HEADER = 'x-avcicms-api-key' as const;
export const CONTENT_LANGUAGE_HEADER = 'x-avcicms-language' as const;

export interface AvciCMSConfig {
  /** Public workspace client ID (`x-avcicms-client`). Never use a raw MongoDB ObjectId. */
  clientId: string;
  /**
   * API Key (`x-avcicms-api-key`):
   * - Browser / Mobile: Publishable Key (`pk_live_...`)
   * - Server / SSR / Cron: Secret Key (`sk_live_...`)
   */
  apiKey: string;
  /** Optional authenticated end-user or admin JWT sent via `Authorization: Bearer <token>`. */
  accessToken?: string;
  baseUrl?: string;
  /** Default content language sent via `x-avcicms-language` header (e.g. 'tr', 'en', 'tr-TR'). */
  language?: string;
}

export function createFetchClient(config: AvciCMSConfig) {
  const baseUrl = config.baseUrl || 'https://api.avcicms.com/v1';

  const client = createClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }: { request: Request }) {
      if (config.clientId) {
        request.headers.set(AVCICMS_CLIENT_HEADER, config.clientId);
      }
      if (config.apiKey) {
        request.headers.set(AVCICMS_API_KEY_HEADER, config.apiKey);
      }
      if (config.accessToken && !request.headers.has('Authorization')) {
        request.headers.set('Authorization', `Bearer ${config.accessToken}`);
      }
      if (config.language && !request.headers.has(CONTENT_LANGUAGE_HEADER)) {
        request.headers.set(CONTENT_LANGUAGE_HEADER, config.language);
      }
      return request;
    },
    async onResponse({ response }: { response: Response }) {
      return response;
    },
  };

  client.use(authMiddleware);

  return client;
}

export type AvciFetchClient = ReturnType<typeof createFetchClient>;
export type FetchClient = AvciFetchClient;
