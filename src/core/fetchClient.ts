import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from '../schema';

export const AVCICMS_CLIENT_HEADER = 'x-avcicms-client' as const;
export const AVCICMS_API_KEY_HEADER = 'x-avcicms-api-key' as const;
export const AVCICMS_SECRET_KEY_HEADER = 'x-avcicms-secret-key' as const;
export const CONTENT_LANGUAGE_HEADER = 'x-avcicms-language' as const;

export interface AvciCMSConfig {
  /** Public workspace client ID (`x-avcicms-client`). Never use a raw MongoDB ObjectId. */
  clientId: string;
  /** Publishable API Key (`pk_live_...`) sent via `x-avcicms-api-key` for browser/mobile requests. */
  apiKey?: string;
  /** Server-side Secret API Key (`sk_live_...`) sent via `x-avcicms-secret-key` for SSR/backend requests. */
  secretKey?: string;
  /** Optional authenticated end-user or admin JWT sent via `Authorization: Bearer <token>`. */
  accessToken?: string;
  /** API origin URL (default: `https://api.avcicms.com`; trailing `/v1` is normalized automatically). */
  baseUrl?: string;
  /** Default content language sent via `x-avcicms-language` header (e.g. 'tr', 'en', 'tr-TR'). */
  language?: string;
}

function normalizeBaseUrl(raw?: string): string {
  const origin = (raw || 'https://api.avcicms.com').replace(/\/+$/, '');
  return origin.replace(/\/v1$/i, '');
}

export function createFetchClient(config: AvciCMSConfig) {
  const baseUrl = normalizeBaseUrl(config.baseUrl);

  const client = createClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }: { request: Request }) {
      if (config.clientId) {
        request.headers.set(AVCICMS_CLIENT_HEADER, config.clientId);
      }
      if (config.secretKey) {
        request.headers.set(AVCICMS_SECRET_KEY_HEADER, config.secretKey);
      } else if (config.apiKey) {
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
