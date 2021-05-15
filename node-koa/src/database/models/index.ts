import { Sequelize } from 'sequelize-typescript'
import { Post } from './post'
const env = process.env

export const sequelize = new Sequelize({
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  port: Number(env.DB_PORT),
  dialect: 'postgres',
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  models: [Post],
})
