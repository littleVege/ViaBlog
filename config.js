/**
 * Created by little_vege on 2014/12/12.
 */

var config = {
    title:'littleVege`s blog',
    mysql_conn:{
        host: 'localhost',
        user: 'root',
        password: 'root',
        debug:true,
        multipleStatements: true
    },
    user_levels: ['admin','user','guest'],
    postsPerPage:10
};

module.exports = config;