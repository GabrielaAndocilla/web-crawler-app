import dotenv from 'dotenv';
dotenv.config();

const user = process.env.USER_DB || '';
const password = process.env.PASSWORD_DB|| '';
const database = process.env.DATABASE_NAME || '';
const host = process.env.HOST_DB || '127.0.0.1';
export default {
  user,
  password,
  database,
  host
}
