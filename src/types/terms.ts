export type TermConsentSubjectType =
  | 'EXTERNAL'
  | 'USER'
  | 'MERCHANT'
  | 'BRAND'
  | 'ORGANIZATION'
  | 'PLACE';

export type TermConsentStatus = 'ACTIVE' | 'REVOKED' | 'SUPERSEDED';

export interface TermSummaryDto {
  _id: string;
  title: string;
  slug: string;
  key?: string;
  scope?: string;
  version?: number;
  versionLabel?: string;
  language?: string;
  languages?: string[];
  requiresReconsent?: boolean;
}

export interface RenderedTermDto {
  templateId: string;
  slug: string;
  key: string;
  title: string;
  scope: string;
  version: number;
  versionLabel: string;
  language: string;
  requiresReconsent: boolean;
  renderedContent: string;
  contentHash: string;
  algorithm: 'SHA-256';
}

export interface RenderTermPayload {
  variables?: Record<string, unknown>;
  language?: string;
}

export interface AcceptTermPayload {
  subject: {
    type?: TermConsentSubjectType;
    externalId: string;
    userId?: string;
    email?: string;
    phone?: string;
    fullName?: string;
    metadata?: Record<string, unknown>;
  };
  variables?: Record<string, unknown>;
  language?: string;
  expectedContentHash?: string;
  acceptedAttachmentCodes?: string[];
  generatePdf?: boolean;
}

export interface TermConsentDto {
  _id: string;
  consentId: string;
  termsTemplate: string;
  termSlug: string;
  termKey: string;
  termTitle: string;
  version: number;
  versionLabel: string;
  language: string;
  subject: AcceptTermPayload['subject'];
  variables: Record<string, unknown>;
  renderedContent: string;
  cryptography: {
    algorithm: 'SHA-256';
    contentHash: string;
    proofHash: string;
    clientSuppliedHash?: string;
  };
  evidence: {
    signedAt: string;
    clientIp: string;
    userAgent: string;
    locale: string;
    source: 'PUBLIC_API' | 'SDK' | 'PANEL';
    pdfUrl?: string;
  };
  status: TermConsentStatus;
  revokedAt?: string;
  revokeReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectConsentStatusResponse {
  externalId: string;
  allAccepted: boolean;
  items: Array<{
    slug: string;
    title: string;
    accepted: boolean;
    needsReconsent: boolean;
    currentVersion: number;
    currentVersionLabel: string;
    acceptedVersion?: number;
    acceptedVersionLabel?: string;
    consentId?: string;
    contentHash?: string;
    proofHash?: string;
    signedAt?: string;
  }>;
}

export interface TermConsentVerificationDto {
  valid: boolean;
  consentId: string;
  algorithm: 'SHA-256';
  status: TermConsentStatus;
  termSlug: string;
  termTitle: string;
  version: number;
  versionLabel: string;
  storedContentHash: string;
  recomputedContentHash: string;
  contentHashMatches: boolean;
  storedProofHash: string;
  recomputedProofHash: string;
  proofHashMatches: boolean;
  expectedHashMatches: boolean | null;
  signedAt: string;
}
