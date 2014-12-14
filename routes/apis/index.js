/**
 * Created by little_vege on 2014/12/13.
 */
var path = require('path');
var postsApi = require(path.join(__dirname,'posts'));
var commentsApi = require(path.join(__dirname,'comments'));
var usersApi = require(path.join(__dirname,'users'));

module.exports = function(app) {
    postsApi(app);
    commentsApi(app);
    usersApi(app);
};