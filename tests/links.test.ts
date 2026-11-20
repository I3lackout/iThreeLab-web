import { describe, expect, it } from 'vitest';
import {
  getSafeExternalUrl,
  isSafeExternalUrl,
  resolveSafeExternalLink,
} from '../src/utils/links';

describe('URL-Validierung (src/utils/links.ts)', () => {
  it('akzeptiert gültige https- und http-URLs und entfernt Rand-Leerzeichen', () => {
    expect(getSafeExternalUrl('https://i3lackout.com')).toBe('https://i3lackout.com/');
    expect(getSafeExternalUrl('  https://musicchaini3.com/tracks  ')).toBe(
      'https://musicchaini3.com/tracks',
    );
    expect(getSafeExternalUrl('http://localhost:8080/health')).toBe('http://localhost:8080/health');
    expect(isSafeExternalUrl('https://i3lackout.com/developer')).toBe(true);
  });

  it('lehnt gefährliche Schemata, leere Werte und fehlerhafte URLs ab', () => {
    expect(getSafeExternalUrl('javascript:alert(1)')).toBeNull();
    expect(getSafeExternalUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
    expect(getSafeExternalUrl('vbscript:msgbox(1)')).toBeNull();
    expect(getSafeExternalUrl('file:///etc/passwd')).toBeNull();
    expect(getSafeExternalUrl('/relative/path')).toBeNull();
    expect(getSafeExternalUrl('not-a-valid-url')).toBeNull();
    expect(getSafeExternalUrl('   ')).toBeNull();
    expect(getSafeExternalUrl(null)).toBeNull();
    expect(getSafeExternalUrl(undefined)).toBeNull();

    expect(isSafeExternalUrl('javascript:void(0)')).toBe(false);
    expect(resolveSafeExternalLink('data:text/plain,hello')).toEqual({
      href: null,
      isValid: false,
    });
  });
});
