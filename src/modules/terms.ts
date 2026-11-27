import { CONTENT_LANGUAGE_HEADER, type AvciFetchClient } from '../core/fetchClient';
import type {
  AcceptTermPayload,
  RenderedTermDto,
  RenderTermPayload,
  SubjectConsentStatusResponse,
  TermConsentDto,
  TermConsentVerificationDto,
  TermSummaryDto,
} from '../types/terms';

interface ApiEnvelope<T> {
  status: string;
  data: T;
}

interface HttpClientLike {
  GET?: (path: string, init?: { headers?: Record<string, string> }) => Promise<{ data?: ApiEnvelope<unknown>; error?: unknown }>;
  POST?: (path: string, init?: { body?: unknown; headers?: Record<string, string> }) => Promise<{ data?: ApiEnvelope<unknown>; error?: unknown }>;
}

export class TermsModule {
  constructor(private readonly client: AvciFetchClient) {}

  private get http(): HttpClientLike {
    return this.client as unknown as HttpClientLike;
  }

  private buildHeaders(language?: string): Record<string, string> | undefined {
    return language ? { [CONTENT_LANGUAGE_HEADER]: language } : undefined;
  }

  /**
   * List published agreement templates.
   * GET /v1/terms
   */
  async list(language?: string): Promise<{ data: TermSummaryDto[] | null; error: unknown }> {
    if (typeof this.http.GET !== 'function') return { data: null, error: null };
    const res = await this.http.GET('/v1/terms', { headers: this.buildHeaders(language) });
    return { data: (res.data?.data as TermSummaryDto[]) ?? null, error: res.error ?? null };
  }

  /**
   * Fetch a single agreement template by slug.
   * GET /v1/terms/:slug
   */
  async get(slug: string, language?: string): Promise<{ data: TermSummaryDto | null; error: unknown }> {
    if (typeof this.http.GET !== 'function') return { data: null, error: null };
    const res = await this.http.GET(`/v1/terms/${encodeURIComponent(slug)}`, {
      headers: this.buildHeaders(language),
    });
    return { data: (res.data?.data as TermSummaryDto) ?? null, error: res.error ?? null };
  }

  /**
   * Render a dynamic agreement with custom variables and receive its SHA-256 contentHash.
   * POST /v1/terms/:slug/render
   */
  async render(
    slug: string,
    payload: RenderTermPayload = {}
  ): Promise<{ data: RenderedTermDto | null; error: unknown }> {
    if (typeof this.http.POST !== 'function') return { data: null, error: null };
    const res = await this.http.POST(`/v1/terms/${encodeURIComponent(slug)}/render`, {
      body: payload,
      headers: this.buildHeaders(payload.language),
    });
    return { data: (res.data?.data as RenderedTermDto) ?? null, error: res.error ?? null };
  }

  /**
   * Record an immutable user consent with server-side SHA-256 verification.
   * POST /v1/terms/:slug/consents
   */
  async accept(
    slug: string,
    payload: AcceptTermPayload
  ): Promise<{ data: TermConsentDto | null; error: unknown }> {
    if (typeof this.http.POST !== 'function') return { data: null, error: null };
    const res = await this.http.POST(`/v1/terms/${encodeURIComponent(slug)}/consents`, {
      body: { ...payload, source: 'SDK' },
      headers: this.buildHeaders(payload.language),
    });
    return { data: (res.data?.data as TermConsentDto) ?? null, error: res.error ?? null };
  }

  /**
   * Check whether a subject has accepted the latest versions of specified agreements.
   * GET /v1/terms/consents/status
   */
  async checkStatus(params: {
    externalId: string;
    slugs?: string[];
  }): Promise<{ data: SubjectConsentStatusResponse | null; error: unknown }> {
    if (typeof this.http.GET !== 'function') return { data: null, error: null };
    const search = new URLSearchParams({ externalId: params.externalId });
    if (params.slugs && params.slugs.length > 0) {
      search.set('slugs', params.slugs.join(','));
    }
    const res = await this.http.GET(`/v1/terms/consents/status?${search.toString()}`);
    return {
      data: (res.data?.data as SubjectConsentStatusResponse) ?? null,
      error: res.error ?? null,
    };
  }

  /**
   * Recompute and verify SHA-256 contentHash and proofHash for a stored consent record.
   * POST /v1/terms/consents/:consentId/verify
   */
  async verify(
    consentId: string,
    hash?: string
  ): Promise<{ data: TermConsentVerificationDto | null; error: unknown }> {
    if (typeof this.http.POST !== 'function') return { data: null, error: null };
    const res = await this.http.POST(`/v1/terms/consents/${encodeURIComponent(consentId)}/verify`, {
      body: hash ? { hash } : {},
    });
    return {
      data: (res.data?.data as TermConsentVerificationDto) ?? null,
      error: res.error ?? null,
    };
  }

  /**
   * Revoke a consent record (preserves audit trail with status=REVOKED).
   * POST /v1/terms/consents/:consentId/revoke
   */
  async revoke(
    consentId: string,
    reason?: string
  ): Promise<{ data: TermConsentDto | null; error: unknown }> {
    if (typeof this.http.POST !== 'function') return { data: null, error: null };
    const res = await this.http.POST(`/v1/terms/consents/${encodeURIComponent(consentId)}/revoke`, {
      body: reason ? { reason } : {},
    });
    return { data: (res.data?.data as TermConsentDto) ?? null, error: res.error ?? null };
  }
}
