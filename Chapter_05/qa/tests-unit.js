var text = require('../lib/text.js');
var expect = require('chai').expect;
//var assert = require('assert');

suite('Test text random', function(){
  test('getText() should return a string', function () {
    // expect(typeof text.getText() === 'number'); // 直接照著書上範例寫怪怪的?
    var local_text = text.getText();
    expect(local_text).to.be.a('string');
    // assert.equal('string', typeof text.getText());
  });
});

/*
 * require('chai').expect 
 * 參考 http://chaijs.com/guide/styles/
 * 
 * require('assert')
 * 參考 https://nodejs.org/api/assert.html
 * 
 * chai 也有assert
 */