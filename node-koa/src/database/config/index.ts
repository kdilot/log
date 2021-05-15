require('dotenv').config()
const env = process.env

const development = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT,
}

const production = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT,
}

const test = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DB_TEST,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT,
}

module.exports = { development, production, test }
