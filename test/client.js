'use strict';

var http = require('../lib/http');

describe('client', function () {
  it('should launch server', function (done) {
    http.listen(8888, done);
  });

  it('should open main page', function () {
    browser.get('http://localhost:8888');
    expect(browser.getTitle()).toBe('Woof');
  });

  function testRouter (route) {
    browser.get('http://localhost:8888' + route);
    return {
      chat: element(by.css('.chat')),
      messages: element.all(by.css('.message'))
    };
  }

  it('should check router work properly', function () {
    var params;

    params = testRouter('/u/vrusha');
    expect(params.chat.evaluate('show.messages[0].user')).toBe('vrusha');
    expect(
      params.messages.get(0).element(by.css('.user')).getText()
    ).toBe('vrusha');
    expect(
      params.messages.get(0).element(by.css('.userpic a')).getAttribute('href')
    ).toBe('http://localhost:8888/u/vrusha');
    expect(
      params.messages.get(0).element(by.css('.userpic img')).getAttribute('src')
    ).toBe('https://bnw.im/u/vrusha/avatar');
    
    params = testRouter('/c/iranian');
    expect(params.chat.evaluate('show.messages[0].text')).toBe('Welcome to Iranian Club');
    expect(
      params.messages.get(4).element(by.css('.text')).getText()
    ).toBe('Welcome to Iranian Club');

    params = testRouter('/t/rorschach');
    expect(params.chat.evaluate('show.messages[0].id')).toBe('WJF6FI');
    expect(
      params.messages.get(0).element(by.css('.id')).getText()
    ).toBe('WJF6FI');
    expect(
      params.chat.element(by.css('.join')).getText()
    ).toBe('Join');

    params = testRouter('/p/DL9OGX');
    expect(params.chat.evaluate('show.replies[1].text')).toBe('хуест');
    expect(
      params.messages.get(2).element(by.css('.id')).getText()
    ).toBe('DL9OGX/YAX');

    params = testRouter('/u/ileamare/c/nethack');
    expect(params.chat.evaluate('show.messages[4].id')).toBe('CZJVJN');
    expect(
      params.messages.get(0).element(by.css('.text')).getText()
    ).toBe('Опять столкнулся с лавочником. Долбили друг дпуга спеллами, а потом я умер от голода -_-');

    params = testRouter('/u/muromec/t/анархи');
    expect(params.chat.evaluate('show.messages[0].id')).toBe('089YX8');
    expect(
      params.messages.get(0).element(by.css('.id')).getText()
    ).toBe('9RCN7B');
  });
});