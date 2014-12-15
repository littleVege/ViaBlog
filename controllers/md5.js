/**
 * Created by little_vege on 2014/12/14.
 */
var crypto = require('crypto');
function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

module.exports = md5;