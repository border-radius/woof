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
      user: element(by.css('.user')),
      club: element(by.css('.club')),
      post: element(by.css('.post')),
      tag: element(by.css('.tag'))
    };
  }

  it('should check router work properly', function () {
    var params;
    
    params = testRouter('/u/vrusha');
    expect(params.user.getText()).toBe('vrusha');
    expect(params.user.evaluate('show.messages[0].user')).toBe('vrusha');
    
    params = testRouter('/c/iranian');
    expect(params.club.getText()).toBe('iranian');
    expect(params.club.evaluate('show.messages[0].text')).toBe('Welcome to Iranian Club');

    params = testRouter('/t/rorschach');
    expect(params.tag.getText()).toBe('rorschach');
    expect(params.club.evaluate('show.messages[0].id')).toBe('WJF6FI');

    params = testRouter('/p/DL9OGX');
    expect(params.post.getText()).toBe('DL9OGX');
    expect(params.post.evaluate('show.replies[1].text')).toBe('хуест');

    params = testRouter('/u/ileamare/c/nethack');
    expect(params.user.getText()).toBe('ileamare');
    expect(params.club.getText()).toBe('nethack');
    expect(params.user.evaluate('show.messages[4].id')).toBe('CZJVJN');

    params = testRouter('/u/muromec/t/анархи');
    expect(params.user.getText()).toBe('muromec');
    expect(params.tag.getText()).toBe('анархи');
    expect(params.user.evaluate('show.messages[0].id')).toBe('089YX8');
  });
});