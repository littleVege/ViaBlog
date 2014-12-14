/**
 * Created by little_vege on 2014/12/13.
 */
var mysql = require('mysql');
var config = require('../../config');
var mustache = require('mustache');
var session = require('express-session');



module.exports = function(app) {

    app.param(function(name, fn){
        if (fn instanceof RegExp) {
            return function(req, res, next, val){
                var captures;
                if (captures = fn.exec(String(val))) {
                    req.params[name] = captures;
                    next();
                } else {
                    next('route');
                }
            }
        }
    });
    app.param('pid',/^\d+$/);

    app.use('/api/p',function(req,res,next) {
        req.db = mysql.createConnection(config.mysql_conn);
        next();
    });

    app.get('/api/p/:pid',function(req,res) {
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
    });

    app.put('/api/p',function(req,res) {
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

    });

    app.post('/api/p/:pid',function(req,res) {
        var db = req.db;
        var title = req.body.title;
        var content = req.body.content;
        var uid = req.body.uid;

        var updatePostSql = mustache.render(
            "update l_blog.posts set title='{{title}}',content={{content}},uid={{uid}}",
            {title:title,content:content,uid:uid}
        );

        db.query(updatePostSql,function(err,results) {
            if(err) {
                throw err;
            }
            res.status(200).json('ok');
        });
    });

    app.param('page',/^\d+$/);
    app.get('/api/p/list/:page',function(req,res) {
        var page = req.param['page'];
        if (page<1||page === undefined) {
            page = 1
        }
        page = page-1;
        var uid = session.uid;
        var getPostsSql = mustache.render(
            "select "
        )


    });

};