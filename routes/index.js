
/* GET home page. */
var path = require('path');
var validator = require('../controllers/validator');
var md5 = require('../controllers/md5');
var user = require('../routes/users');
var config = require('../config');
var db = require('mysql');
module.exports = function(app) {

  function isValidUserName(userName) {
    if (userName.length>15) {
      return false;
    }
    if (validator.isDbKeyword(userName)) {
      return false;
    }
    return true;
  }

  function isValidPassword(password) {
    if (password.length<6||password.length>15) {
      return false;
    }
    return true;
  }

  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.post(['/register','/login','/:userName/edit'],function(req,res,next) {
    var userName = req.body['name'];
    var password = req.body['password'];
    if (!isValidUserName(userName)) {
      next(new Error('not allowed user name'));
    }
    if (!isValidPassword(password)) {
      next(new Error('not allowed password'));
    }
    password = md5(password);
    req.body['password'] = password;
    req.db = db.createConnection(config.mysql_conn);
    next();
  });

  /*users routes*/
  app.get('/login',user.login);
  app.post('/register',user.submitRegister);
  app.post('/login',user.submitLogin);
  app.get('/logout',user.submitLogout);
  app.get('/:userName/edit',user.edit);
  app.post('/:userName/edit',user.submitEdit);
  app.get('/:userName/del',user.del);
};