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
    
    params = testRouter('/u/username');
    expect(params.user.getText()).toBe('username');
    
    params = testRouter('/c/clubname');
    expect(params.club.getText()).toBe('clubname');

    params = testRouter('/t/tagname');
    expect(params.tag.getText()).toBe('tagname');

    params = testRouter('/p/postid');
    expect(params.post.getText()).toBe('postid');

    params = testRouter('/u/username/c/clubname');
    expect(params.user.getText()).toBe('username');
    expect(params.club.getText()).toBe('clubname');

    params = testRouter('/u/username/t/tagname');
    expect(params.user.getText()).toBe('username');
    expect(params.tag.getText()).toBe('tagname');
  });
});