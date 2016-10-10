/**
 * lesson4.js
 * 使用 eventproxy 控制并发
 *
 * Created by xiepan on 2016/10/9 09:33.
 */

var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = "https://cnodejs.org/";

superagent.get(cnodeUrl)
    .end(function (err, res) {
        if (err) {
            return console.error(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);

        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });
        console.log(topicUrls);

        var ep = new eventproxy();
        ep.after('topic_html', topicUrls.length, function (topics) {

            topics = topics.map(function (topicPair) {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comments1: $('.reply_content').eq(0).text().trim()
                });
            });
            console.log('final:');
            console.log(topics);
        });

        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
            // .end(function (err, res) {
            //     console.log('fetch ' + topicUrl + ' successful');
            //     eq.emit('topic_html', [topicUrl, res.text]);
            // });
                .end(ep.group('topic_html', function (data) {
                    return data;
                }));
        });
    });