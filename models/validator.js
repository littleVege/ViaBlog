/**
 * Created by little_vege on 2014/12/14.
 */
module.exports = {
    isDbKeyword:function(text) {
        return /[\s'";]|(select)|(insert)|(update)/ig.test(text);
    },
    isEmptyStr:function(text) {
        return text === ''||text === null
    }
};