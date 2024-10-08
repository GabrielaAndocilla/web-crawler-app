
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const user = process.env.USER_DB || '';
const password = process.env.PASSWORD_DB|| '';
const database = process.env.DATABASE_NAME || '';
const host = process.env.HOST_DB || '127.0.0.1';

const sequelize = new Sequelize(database,user,password,{
  dialect: 'mysql',
  host
});
export default sequelize
