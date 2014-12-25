/**
 * Created by little_vege on 2014/12/13.
 */
var config = require('../../config');
var session = require('express-session');

var exports = module.exports;


exports.getList = function(req,res,next) {
    var page = req.params['page'];
    var uid = req.session.user.uid;
    var limit = config.postsPerPage;
    var db = req.db;
    if (page<1||page === undefined) {
        page = 1
    }
    page = page-1;
    db.connect();
    db.query('select * from posts where uid=? limit ? offset ?;',
        [uid,limit,page*limit],
        function(err,result) {
            if (err) throw err;
            res.status(200).json(result);
        }
    );
};

exports.find = function(req,res,next) {
    var db = req.db;
    db.connect();
    var getPostTemplate = 'select * from l_blog.posts where pid={{pid}}';
    db.query('select * from l_blog.posts where pid=?;',[req.params['pid']], function(err,rows) {
        if (err) {
            throw err;
        }
        res.status(200).json(rows);
    });
    db.end();
};

exports.create = function(req,res,next) {
    var db = req.db;
    var title = req.body.title;
    var content = req.body.content;
    db.query(
        'insert into l_blog.posts (title,content,uid) values (?,?,?);',
        {title:title,content:content,uid:1},
        function(err,result) {
            if (err) {
                throw err;
            }
            res.status(200).json({pid:result.insertId});
        }
    );
    db.end();
};

exports.update = function(req,res,next) {
    var db = req.db;
    var title = req.body.title;
    var content = req.body.content;
    var uid = req.session.user.uid;


    db.query('update l_blog.posts set title=?,content=? where uid=?;',
        [title,content,uid],
        function(err,results) {
            if(err) {
                throw err;
            }
            res.status(200).json('ok');
        }
    );
};

exports.del = function(req,res,next) {

};
