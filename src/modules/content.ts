import type { AvciFetchClient } from '../core/fetchClient';
import { CONTENT_LANGUAGE_HEADER } from '../core/fetchClient';

export interface ContentQueryOptions {
  params?: Record<string, string | number | boolean | undefined>;
  language?: string;
}

interface GenericClient {
  GET: (
    url: string,
    init?: { params?: { query?: Record<string, unknown> }; headers?: Record<string, string> }
  ) => Promise<{ data?: unknown; error?: unknown }>;
}

export class ContentModule {
  constructor(private readonly client: AvciFetchClient) {}

  private buildHeaders(language?: string): Record<string, string> | undefined {
    return language ? { [CONTENT_LANGUAGE_HEADER]: language } : undefined;
  }

  /**
   * Fetch multiple documents from a content module (e.g. `blog`, `news`, `page`, `word`).
   */
  async findMany<T = unknown>(modelSlug: string, options?: ContentQueryOptions) {
    const cleanSlug = modelSlug.replace(/^\/+/, '');
    const genericClient = this.client as unknown as GenericClient;
    return genericClient.GET(`/v1/${cleanSlug}`, {
      params: options?.params ? { query: options.params } : undefined,
      headers: this.buildHeaders(options?.language),
    }) as Promise<{ data?: T; error?: unknown }>;
  }

  /**
   * Fetch a single document by ID or slug from a content module.
   */
  async findOne<T = unknown>(modelSlug: string, idOrSlug: string, options?: ContentQueryOptions) {
    const cleanSlug = modelSlug.replace(/^\/+/, '');
    const cleanId = encodeURIComponent(idOrSlug);
    const genericClient = this.client as unknown as GenericClient;
    return genericClient.GET(`/v1/${cleanSlug}/${cleanId}`, {
      params: options?.params ? { query: options.params } : undefined,
      headers: this.buildHeaders(options?.language),
    }) as Promise<{ data?: T; error?: unknown }>;
  }
}
