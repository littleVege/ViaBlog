/**
 * Created by little_vege on 2014/12/13.
 */
var mustache = require('mustache');
var config = require('../config');
var session = require('express-session');
var _ = require('underscore');
var md = require('node-markdown').Markdown;
var exports = module.exports;

exports.get = function(req,res,next) {
    var db = req.db;
    db.connect();
    var getPostTemplate = 'select * from l_blog.posts where pid={{pid}}';
    db.query(mustache.render(getPostTemplate,{pid:req.params['pid']}), function(err,rows) {
        if (err) {
            throw err;
        }
        res.status(200).json(rows);
    });
    db.end();
};



/**
 * @route /list/:page
 * @param req
 * @param res
 * @param next
 */
exports.list = function(req,res,next) {
    var db = req.db;
    var page = req.param('page')||1;
    page = parseInt(page);
    if (page<1) {
        page = 1;
    }
    var limit = config.postsPerPage;
    page = page-1;

    var offset = limit*page;
    var uid = session.uid;
    var getListSql = mustache.render(
        'select title,content,tags,timestamp from posts where uid = {{uid}} limit {{limit}} offset {{offset}};',
        {uid:uid,limit:limit,offset:offset}
    );
    db.query(getListSql,function(err,results) {
        if (err) throw err;
        var rows = results[0];
        //TODO:get abstract of content;
        _.map(rows,function(col,idx) {
            var content = col.content;
            var title = col.title;
            if (content) {
                content = md(content);
            }
        },this);
    });

};
/**
 * @route /admin/post/create
 * @param req
 * @param res
 * @param next
 */

exports.create = function(req,res,next) {
    var db = req.db;
    var title = req.body.title;
    var content = req.body.content;
    var insertPostSql = mustache.render(
        "insert into l_blog.posts (title,content,uid) values ('{{title}}','{{content}}',{{uid}});select last_insert_id() as pid;",
        {title:title,content:content,uid:1}
    );
    db.query(insertPostSql,function(err,results) {
        if (err) {
            throw err;
        }
        var rows = results[1];
        res.status(200).json({pid:rows[0].pid});
    });
    db.end();
};

/**
 * @route /admin/p/:pid
 * @type get
 * @param req
 * @param res
 * @param next
 */
exports.edit = function(req,res,next) {

};

/**
 * @route /admin/:pid/edit
 * @type post
 * @param req
 * @param res
 * @param next
 */
exports.submitEdit = function(req,res,next) {

};

/**
 * @route /admin/p/:pid/delete
 * @type  post
 * @param req
 * @param res
 * @param next
 */
exports.del = function(req,res,next) {

};

/**
 * @route /post/:pid/cmt/create
 * @param req
 * @param res
 * @param next
 */
exports.createCmt = function (req, res, next) {

};

/**
 * @route /post/:pid/cmt/:cid
 */
exports.getCmt = function (req, res, next) {

};

/**
 * @route /post/:pid/cmt/delete
 */

exports.deleteCmt = function(req,res,next) {

};
