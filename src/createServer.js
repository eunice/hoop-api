import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-bodyparser'
import compress from 'koa-compress'
import logger from 'koa-logger'
import session from 'koa-session'

// Load env variables
require('dotenv').config()

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

export default function createServer(PORT) {
  const app = new Koa()
  const router = new Router()
  app.use(compress())
  app.use(logger())
  app.use(koaBody())
  app.keys = ['some secret hurr']

  router.get('/', async (ctx) => {
    ctx.body = "Hello World!"
  })

  app.use(session(CONFIG, app));
  app.use(router.routes())
  app.use(router.allowedMethods())

  return app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}. Hooray!`)
  })
}


