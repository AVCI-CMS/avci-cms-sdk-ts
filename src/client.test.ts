import { describe, it, expect, vi, afterEach } from 'vitest';
import { AvciCMS } from './client';

describe('AvciCMS TS SDK', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize correctly with clientId and publishable apiKey', () => {
    const cms = new AvciCMS({
      clientId: 'test-client-uuid',
      apiKey: 'pk_live_test_key',
    });
    expect(cms).toBeDefined();
    expect(cms.content).toBeDefined();
    expect(cms.workspace).toBeDefined();
  });

  it('should attach x-avcicms-client, x-avcicms-api-key, and x-avcicms-language without double /v1', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: 'success', data: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    const cms = new AvciCMS({
      clientId: 'uuid-1234',
      apiKey: 'pk_live_abc',
      language: 'tr',
      baseUrl: 'https://api.avcicms.com/v1',
    });

    await cms.workspace.getMenus();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const req = fetchMock.mock.calls[0][0] as Request;
    expect(req.url).toBe('https://api.avcicms.com/v1/menu');
    expect(req.headers.get('x-avcicms-client')).toBe('uuid-1234');
    expect(req.headers.get('x-avcicms-api-key')).toBe('pk_live_abc');
    expect(req.headers.get('x-avcicms-secret-key')).toBeNull();
    expect(req.headers.get('x-avcicms-language')).toBe('tr');
  });

  it('should attach x-avcicms-secret-key when secretKey is configured', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: 'success', data: {} }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    const cms = new AvciCMS({
      clientId: 'uuid-1234',
      secretKey: 'sk_live_server_secret',
    });

    await cms.content.findOne('blog', 'hello-world', { language: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const req = fetchMock.mock.calls[0][0] as Request;
    expect(req.url).toBe('https://api.avcicms.com/v1/blog/hello-world');
    expect(req.headers.get('x-avcicms-client')).toBe('uuid-1234');
    expect(req.headers.get('x-avcicms-secret-key')).toBe('sk_live_server_secret');
    expect(req.headers.get('x-avcicms-api-key')).toBeNull();
    expect(req.headers.get('x-avcicms-language')).toBe('en');
  });
});
