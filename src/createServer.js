import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-bodyparser'
import compress from 'koa-compress'
import logger from 'koa-logger'
import jwt from 'koa-jwt'

// Load env variables
require('dotenv').config()

export default function createServer(PORT, JWT_SECRET) {
  const app = new Koa()
  const router = new Router()
  app.use(compress())
  app.use(logger())
  app.use(koaBody())

  router.get('/', async (ctx) => {
    ctx.body = "Hello World!"
  })

  app.use(jwt({ secret: JWT_SECRET }).unless({ path: [/^\/public/] }));
  app.use(function(ctx, next){
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      } else {
        throw err;
      }
    });
  });

  app.use(router.routes())
  app.use(router.allowedMethods())

  return app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}. Hooray!`)
  })
}


