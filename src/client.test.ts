import { describe, it, expect } from 'vitest';
import { AvciCMS } from './client';

describe('AvciCMS TS SDK', () => {
  it('should initialize correctly with api key and project id', () => {
    const cms = new AvciCMS({ apiKey: 'test-key', projectId: 'test-project' });
    expect(cms).toBeDefined();
    expect(cms.content).toBeDefined();
    expect(cms.workspace).toBeDefined();
  });
});
