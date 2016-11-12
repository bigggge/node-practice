/**
 * node-segment.js
 *
 * Created by xiepan on 2016/10/21 12:01.
 */

var Segment = require('segment');

var segment = new Segment();
segment.useDefault();

console.log(segment.doSegment('这是一个基于Node.js的中文分词模块。', {
    simple: true,
}));
