import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME, NODE_ENV } from '@config';
import { Sequelize } from 'sequelize';

export const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
});
