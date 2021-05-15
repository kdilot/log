import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import * as dotenv from 'dotenv'
import { sequelize } from '@database/models'
import cors from '@koa/cors'
import v1 from './api/v1'

dotenv.config()
const app = new Koa()
const router = new Router()
const port: number = 3100

sequelize
  .sync()
  // .sync({ force: true }) //  테이블 리셋
  .then(() => {
    console.log('DB 연결 성공')
  })
  .catch(() => console.log('DB 연결 오류'))

app.use(cors())
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())
app.use(v1.routes())

app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`)
})
