/**
 * Created by little_vege on 2014/12/13.
 */
var path = require('path');
var post = require('../../routes/api/post');
var cmt = require('../../routes/api/cmt');
var user = require('../../routes/api/user');

module.exports = function(app) {
    app.get('/api/post/:pid',post.find);
    app.post('/api/post/create',post.create);
    app.post('/api/post/:pid/edit',post.update);
    app.post('/api/post/:pid/delete',post.del);
    app.post('/api/post/list/:page',post.getList);
};