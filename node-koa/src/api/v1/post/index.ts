import Koa from 'koa'
import Router from '@koa/router'
import { Post } from '@database/models/post'

const router = new Router()

router.get('/posts', async (ctx: Koa.Context) => {
  const { limit, offset } = ctx.query
  try {
    const rs = await Post.findAll({
      limit: Number(limit) || 100,
      offset: Number(offset) || 0,
      order: [['no', 'DESC']],
    })
    ctx.status = 200
    ctx.body = { data: rs }
  } catch (error) {
    ctx.status = 400
    ctx.body = { error: error.message }
  }
})

router.get('/post/:no', async (ctx) => {
  const { no } = ctx.params
  try {
    const rs = await Post.findOne({ where: { no } })
    ctx.status = 200
    ctx.body = { data: rs }
  } catch (error) {
    ctx.status = 400
    ctx.body = { error: error.message }
  }
})

router.post('/post', async (ctx) => {
  const { title, contents } = ctx.request.body
  try {
    const rs = await Post.create({ title, contents })
    ctx.status = 200
    ctx.body = { data: { no: rs.no }, message: 'success' }
  } catch (error) {
    ctx.status = 400
    ctx.body = { error: error.message }
  }
})

router.put('/post/:no', async (ctx) => {
  const { no } = ctx.params
  const { title, contents } = ctx.request.body
  if (!title.trim() || !contents.trim()) {
    ctx.status = 400
    ctx.body = 'invalid title or contents'
  } else {
    try {
      const test = await Post.update({ title, contents }, { where: { no } })
      console.log(test)
      ctx.status = 200
      ctx.body = { message: 'success' }
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error.message }
    }
  }
})

export default router
