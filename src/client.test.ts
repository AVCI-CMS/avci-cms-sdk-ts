import { describe, it, expect } from 'vitest';
import { AvciCMS } from './client';

describe('AvciCMS TS SDK', () => {
  it('should initialize correctly with clientId and publishable apiKey', () => {
    const cms = new AvciCMS({
      clientId: 'test-client-uuid',
      apiKey: 'pk_live_test_key',
    });
    expect(cms).toBeDefined();
    expect(cms.content).toBeDefined();
    expect(cms.workspace).toBeDefined();
  });
});
