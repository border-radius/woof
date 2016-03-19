'use strict';

var urlPattern = /(^|&lt;|[\s\(\[])(https?:\/\/[^\]\)\s]+)/g;
var quotePattern = /&quot;.+&quot;/g;

//because $sanitize sucks
function sanitize (html) {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = function () {
  return {
    templateUrl: 'text',
    scope: {
      content: '=content',
      replyto: '=replyto',
      rich: '=rich'
    },
    link: function (scope, elem, attrs) {
      scope.$watch(attrs.content, function () {
        var text = scope.content;

        //remove useless form of address in nested replies
        if (scope.replyto) {
          text = text.replace(/^@[^\s]+ /i, '');
        }

        text = sanitize(text);

        if (scope.rich) {
          //clickable links
          text = text.replace(urlPattern, function (match, space, link) {
            return space + ['<a href="', '" target="_blank">', '</a>'].join(link);
          });

          //paragraphs and blockquotes
          text = text.split(/\n+/g).map(function (line) {
            if (line.trim().indexOf('&gt;') === 0) {
              return ['<blockquote><p>', '</p></blockquote>'].join(line);
            } else {
              return ['<p>', '</p>'].join(line);
            }
          }).join('\n');

          //pleasant quotes
          text = text.replace(quotePattern, function (match) {
            return ['<em>', '</em>'].join(match);
          });
        }

        scope.html = text;
      });
    }
  };
};