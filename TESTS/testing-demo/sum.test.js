const test = require('node:test');
const assert = require('node:assert');
const { sum }  = require('./sum.js');

test('add two positive numbers', ()=>{
    assert.strictEqual(sum(2,3), 5);
})

test('add negative numbers', ()=>{
    assert.strictEqual(sum(-2,-3), -5);
})

test('add zero', ()=>{
    assert.strictEqual(sum(5,0),5);
})