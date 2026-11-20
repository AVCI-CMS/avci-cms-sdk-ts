import { describe, it, expect } from 'vitest';
import * as crypto from 'crypto';
import { verifyCacheSignature } from './index';

describe('verifyCacheSignature', () => {
  const secretKey = 'crsec_test_secret_123456789';
  const rawBody = JSON.stringify({
    event: 'catalog.product.updated',
    entity: 'product',
    action: 'UPDATED',
    slug: 'modern-desk',
    paths: ['/product/modern-desk'],
    tags: ['product', 'product:modern-desk'],
  });

  it('should successfully verify a valid signature', () => {
    const timestamp = Date.now();
    const payload = `${timestamp}.${rawBody}`;
    const hash = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
    const signatureHeader = `t=${timestamp},v1=${hash}`;

    const result = verifyCacheSignature({
      rawBody,
      signatureHeader,
      secretKey,
    });

    expect(result.valid).toBe(true);
    expect(result.timestamp).toBe(timestamp);
  });

  it('should fail when signature is tampered', () => {
    const timestamp = Date.now();
    const signatureHeader = `t=${timestamp},v1=bad_signature_hash_000000000000000000000000000000000000000000000000000000`;

    const result = verifyCacheSignature({
      rawBody,
      signatureHeader,
      secretKey,
    });

    expect(result.valid).toBe(false);
    expect(result.reason).toBe('Signature verification failed');
  });

  it('should fail when timestamp is outside tolerance window', () => {
    const timestamp = Date.now() - 600 * 1000; // 10 minutes ago
    const payload = `${timestamp}.${rawBody}`;
    const hash = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
    const signatureHeader = `t=${timestamp},v1=${hash}`;

    const result = verifyCacheSignature({
      rawBody,
      signatureHeader,
      secretKey,
      toleranceSeconds: 300,
    });

    expect(result.valid).toBe(false);
    expect(result.reason).toContain('outside tolerance window');
  });
});
