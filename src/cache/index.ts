import * as crypto from 'crypto';

export interface CacheRevalidationPayload {
  event: string;
  entity: string;
  action: string;
  slug?: string;
  id?: string;
  paths: string[];
  tags: string[];
  timestamp: number;
}

export interface VerifyCacheSignatureOptions {
  /**
   * The raw request body as string
   */
  rawBody: string;
  /**
   * The x-avci-cache-signature header (format: "t=1732095600000,v1=...")
   */
  signatureHeader: string;
  /**
   * The secret key from AVCI CMS Workspace Settings (crsec_...)
   */
  secretKey: string;
  /**
   * Allowed timestamp drift in seconds (default: 300 = 5 minutes). Pass 0 to disable drift check.
   */
  toleranceSeconds?: number;
}

export interface VerifyCacheSignatureResult {
  valid: boolean;
  reason?: string;
  timestamp?: number;
}

/**
 * Verifies an incoming AVCI CMS cache revalidation callback request.
 *
 * @example
 * ```typescript
 * import { verifyCacheSignature } from 'avcicms';
 *
 * const rawBody = await request.text();
 * const signatureHeader = request.headers.get('x-avci-cache-signature');
 * const secretKey = process.env.AVCI_CACHE_SECRET!;
 *
 * const { valid, reason } = verifyCacheSignature({
 *   rawBody,
 *   signatureHeader,
 *   secretKey,
 * });
 *
 * if (!valid) {
 *   return new Response(`Unauthorized: ${reason}`, { status: 401 });
 * }
 * ```
 */
export function verifyCacheSignature(options: VerifyCacheSignatureOptions): VerifyCacheSignatureResult {
  const { rawBody, signatureHeader, secretKey, toleranceSeconds = 300 } = options;

  if (!rawBody) {
    return { valid: false, reason: 'Request body is empty' };
  }

  if (!signatureHeader) {
    return { valid: false, reason: 'Signature header is missing' };
  }

  if (!secretKey) {
    return { valid: false, reason: 'Secret key is missing' };
  }

  const parts = signatureHeader.split(',');
  const tPart = parts.find(p => p.startsWith('t='));
  const v1Part = parts.find(p => p.startsWith('v1='));

  if (!tPart || !v1Part) {
    return { valid: false, reason: 'Malformed signature header format' };
  }

  const timestampStr = tPart.substring(2);
  const receivedSignature = v1Part.substring(3);
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp)) {
    return { valid: false, reason: 'Invalid timestamp in signature header' };
  }

  // Tolerance check
  if (toleranceSeconds > 0) {
    const now = Date.now();
    const diff = Math.abs(now - timestamp) / 1000;
    if (diff > toleranceSeconds) {
      return { valid: false, reason: `Timestamp outside tolerance window (${diff}s > ${toleranceSeconds}s)`, timestamp };
    }
  }

  // HMAC-SHA256 verification
  const expectedPayload = `${timestamp}.${rawBody}`;
  const expectedSignature = crypto.createHmac('sha256', secretKey).update(expectedPayload).digest('hex');

  const receivedBuffer = Buffer.from(receivedSignature, 'utf8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

  if (receivedBuffer.length !== expectedBuffer.length) {
    return { valid: false, reason: 'Signature length mismatch', timestamp };
  }

  const isMatch = crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
  if (!isMatch) {
    return { valid: false, reason: 'Signature verification failed', timestamp };
  }

  return { valid: true, timestamp };
}
