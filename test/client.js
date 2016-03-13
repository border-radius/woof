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
      params.messages.get(0).element(by.css('.username')).getText()
    ).toBe('vrusha');
    expect(
      params.messages.get(0).element(by.css('.username a')).getAttribute('href')
    ).toBe('http://localhost:8888/u/vrusha');
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

  it('should check formatting works properly', function () {
    browser.get('http://localhost:8888/p/M8CUD2');

    var message = element.all(by.css('.message')).get(0);

    expect(message.element(by.css('.text')).getInnerHtml()).toEqual('<p><a href="https://tjournal.ru/p/twitter-new-rules-ban" target="_blank">https://tjournal.ru/p/twitter-new-rules-ban</a></p>\n<blockquote><p>&gt;Михайлов временно перешёл на Фейсбук, однако и там ему на сутки  заблокировали возможность писать новые посты после публикации скриншотов  нескольких твитов, нарушавших правила Твиттера. По словам  блогера, он подавал жалобы на твиты публицистов Егора Холмогорова и  Егора Просвирнина с призывами к убийствам, однако их блокировки ему  добиться не удалось.</p></blockquote>\n<p>Вообще вся статья просто уморительная история.</p>\n<p>Святой человек Миша В. был совершенно прав: SJW, исламисты, и путинисты вообще ничем не отличаются друг от друга. Всё они сторонники цензуры и яростные противники свободы слова, свободы совести, промискуитета и всех остальных неотчуждаемых прав человека.</p>\n<p>В данной статье рассказывается как SJW и путинисты выступили единым фронтом. Ничего удивительного. Между этими двумя группами разницы вообще-то никакой, SJW - это такие западные путинисты.</p>');

    expect(message.element(by.css('.date')).getText()).toEqual('15:3931.12.2015');
    expect(message.element(by.css('.date')).getAttribute('title')).toEqual('15:39:32 31.12.2015');

    var tags = message.all(by.css('.taglist a'));
    
    expect(tags.get(0).getText()).toEqual('*ублюдки');
    expect(tags.get(1).getText()).toEqual('*леваки');
    expect(tags.get(2).getText()).toEqual('*гулаг');
    expect(tags.get(3).getText()).toEqual('*stop_censorship');
    expect(tags.get(0).getAttribute('href')).toEqual('http://localhost:8888/u/anonymous/t/%D1%83%D0%B1%D0%BB%D1%8E%D0%B4%D0%BA%D0%B8');

    var recommendations = message.all(by.css('.recommendation'));

    expect(recommendations.count()).toBe(3);
    expect(recommendations.get(0).getText()).toBe('goren');
    expect(recommendations.get(1).getText()).toBe('hate-engine');
    expect(recommendations.get(2).getText()).toBe('krkm');
    expect(recommendations.get(0).element(by.css('img')).getAttribute('src')).toBe('https://bnw.im/u/goren/avatar');
  });

  it('should check quoting works properly', function () {
    browser.get('http://localhost:8888/p/G01TVD');

    var messages = element.all(by.css('.message'));
    var reply = messages.get(3);

    expect(reply.element(by.css('quote img')).getAttribute('src')).toBe('https://bnw.im/u/anonymous/avatar');
    expect(reply.element(by.css('quote .text')).getText()).toBe('хуле ты мне тут удаляешь, цитировать — так до конца');
  });
});