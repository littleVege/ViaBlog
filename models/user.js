/**
 * Created by little_vege on 2014/12/14.
 */
var _ = require('underscore');

function User(props) {
    this.uid = props.uid||-1;
    this.name = props.name||'';
    this.password = props.password||'';
    this.email = props.email||'';
    this.createAt = props.createAt||props.create_at||new Date();
    this.ip = props.ip||props.ip_address||'0,0,0,0';
    this.level = props.level;
}

module.exports = User;