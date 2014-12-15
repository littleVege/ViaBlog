
var mustache = require('mustache');
var md5 = require('../controllers/md5');
var config = require('../config');
var User = require('../models/user');
var _ = require('underscore');
module.exports.login = function(req,res,next) {
    res.status(200).render('login',{
        title:config.title
    });
};

/**
 * @route /login
 * @type post
 * @param req
 * @param res
 * @param next
 */
module.exports.submitLogin = function(req,res,next) {
    var session = req.session;
    var db = req.db;
    var userName = req.body["name"];
    var password = req.body["password"];
    var findUserSQL = mustache.render(
        "select uid,name,password,email,create_at,level from users where name='{{name}}' and password='{{password}}' limit 1;",
        {name:userName,password:password}
    );
    db.query(findUserSQL,function(err,rows) {
        var resJson = {
            status:'error',
            message:'not login,your username or password is not valid!'
        };
        if (!rows[0]) {
            res.status(200).json(resJson);
        } else {
            session.user = new User(rows[0]);
            resJson = _.extend(resJson,{
                status:'ok',
                message:'auth success'
            });
            res.status(200).json(resJson);
        }
    });
};

/**
 *
 * @route /logout
 * @param req
 * @param res
 * @param next
 */
module.exports.submitLogout = function(req,res,next) {
    req.session.destroy(function(err) {
        if (err) throw err;
        res.status(200).json({
            status:'ok',
            message:'logout ok'
        });
    });
};

/**
 * @route /register
 * @param req
 * @param res
 * @param next
 */

module.exports.submitRegister = function (req,res,next) {
    var db = req.db;
    var userName = req.body["name"];
    var password = req.body["password"];
    var email = req.body["email"];
    var ip = req.ip;
    var registUserSQL = mustache.render(
        "insert into users (name,password,email,ip_address,level) " +
        "values ('{{name}}','{{password}}','{{ip}}',{{level}});" +
        "select last_insert_id() as uid;",
        {name:userName,password:password,email:email,ip:ip}
    );
    db.query(registUserSQL,function(err,results) {
        if (err) throw err;
        var rows = results[1];
        res.status(200).send(rows[0].uid);
    });

};

/**
 * @route /:userName/edit
 * @param req
 * @param res
 * @param next
 */
module.exports.edit = function(req,res,next) {

};

/**
 * @route /:userName/edit/submit
 * @param req
 * @param res
 * @param next
 */
module.exports.submitEdit = function(req,res,next) {

};

/**
 * @route /:userName/del
 * @param req
 * @param res
 * @param next
 */
module.exports.del = function(req,res,next) {

};

