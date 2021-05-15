import Router from '@koa/router'
import post from './post'

export const router = new Router({
  prefix: '/api/v1',
})

router.use(post.routes())

export default router
