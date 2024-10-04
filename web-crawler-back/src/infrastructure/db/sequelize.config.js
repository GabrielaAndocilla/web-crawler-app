require('ts-node/register');
const config = require('./config');
console.log(config.user)
module.exports = {
  username: config.default.user,
  password: config.default.password,
  database: config.default.database,
  host: config.default.host,
  dialect: 'mysql',
  port: 3306
};
