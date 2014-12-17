
/* GET home page. */
var path = require('path');
var validator = require('../models/validator');
var md5 = require('../models/md5');
var user = require('../routes/users');
var config = require('../config');
/**
 * @module routes
 * @param app
 */
module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.post(['/register','/login','/:userName/edit'],user.checkUserInfo);

  /*users routes*/

  app.get('/login',user.login);
  app.get('/register',user.register);
  app.post('/register',user.submitRegister);
  app.post('/login',user.submitLogin);
  app.get('/logout',user.submitLogout);
  app.get('/:userName/edit',user.edit);
  app.post('/:userName/edit',user.submitEdit);
  app.get('/:userName/del',user.del);

  app.get('/admin',function(req,res,next) {
      res.render('dashboard',{
          title:config.title
      });
  });
};