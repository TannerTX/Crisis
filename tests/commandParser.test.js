const test = require('node:test');
const assert = require('node:assert/strict');

const { parseCommand } = require('../utilities/commandParser');

test('parseCommand returns null for non-prefixed messages', () => {
    assert.equal(parseCommand('hello world', ','), null);
});

test('parseCommand parses command and args', () => {
    assert.deepEqual(parseCommand(',stocks AAPL TSLA', ','), {
        commandName: 'stocks',
        args: ['AAPL', 'TSLA'],
    });
});

test('parseCommand trims extra spaces', () => {
    assert.deepEqual(parseCommand(',   join   now ', ','), {
        commandName: 'join',
        args: ['now'],
    });
});
