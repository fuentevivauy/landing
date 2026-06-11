import assert from 'node:assert/strict';
import test from 'node:test';
import { publicAssetUrl } from './assets.ts';

test('uses the default R2 public URL when no override is configured', () => {
    assert.equal(
        publicAssetUrl('hero/video.mp4'),
        'https://pub-ca2ecc1cb4254361b44aa79f5e034cd2.r2.dev/hero/video.mp4'
    );
});
