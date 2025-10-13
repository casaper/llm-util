import { describe, expect, it } from 'vitest';

import { langs } from './langs';

describe('langs', () => {
  it('includes en and de', () => {
    expect(langs).toEqual(['en', 'de']);
  });
});
