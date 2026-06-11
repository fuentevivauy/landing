import assert from 'node:assert/strict';
import test from 'node:test';
import { formatProductPrice, hasProductPrice } from './price.ts';

test('shows quote request when price is missing or zero', () => {
    assert.equal(formatProductPrice(null), 'Requiere cotización');
    assert.equal(formatProductPrice(0), 'Requiere cotización');
    assert.equal(hasProductPrice(null), false);
    assert.equal(hasProductPrice(0), false);
});

test('formats positive prices in Uruguayan pesos', () => {
    assert.equal(formatProductPrice(12500), '$12.500');
    assert.equal(hasProductPrice(12500), true);
});
