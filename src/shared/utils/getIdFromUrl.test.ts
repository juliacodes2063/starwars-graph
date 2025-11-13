import { describe, it, expect } from 'vitest';
import { getIdFromUrl } from './getIdFromUrl';

describe('getIdFromUrl', () => {
  it('returns last segment for full SW url with trailing slash', () => {
    const result = getIdFromUrl('https://sw-api.starnavi.io/api/people/1/');
    expect(result).toBe('1');
  });

  it('works without trailing slash', () => {
    const result = getIdFromUrl('https://sw-api.starnavi.io/api/people/42');
    expect(result).toBe('42');
  });

  it('works for relative paths', () => {
    const result = getIdFromUrl('/people/7/');
    expect(result).toBe('7');
  });

  it('returns null for null / undefined / empty string', () => {
    expect(getIdFromUrl(null)).toBeNull();
    expect(getIdFromUrl(undefined)).toBeNull();
    expect(getIdFromUrl('')).toBeNull();
  });

  it('ignores extra slashes when splitting', () => {
    const result = getIdFromUrl('https://sw-api.starnavi.io/api//people//5//');
    expect(result).toBe('5');
  });
});
