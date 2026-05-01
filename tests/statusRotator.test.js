const test = require('node:test');
const assert = require('node:assert/strict');

const { getNextStatusIndex } = require('../utilities/statusRotator');

test('increments index while in range', () => {
    assert.equal(getNextStatusIndex(0, 4), 1);
});

test('wraps around when reaching end', () => {
    assert.equal(getNextStatusIndex(3, 4), 0);
});

test('handles invalid current index', () => {
    assert.equal(getNextStatusIndex(-1, 4), 0);
});
