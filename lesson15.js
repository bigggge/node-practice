/**
 * mongodb.js
 *
 * Created by xiepan on 2016/10/10 16:31.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', {
    name: String,
    friends: [String],
    age: Number
});

var kitty = new Cat({name: 'hdy', friends: ['tom', 'jerry']});
kitty.age = 3;

kitty.save(function (err) {
    if (err) {

    }
    console.log('meow');

})