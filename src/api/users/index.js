import Router from 'koa-router'
import Accounts from '../../lib/accounts'
import db from '../../db'
import Joi from 'joi'

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
  passwordConfirmation: Joi.string().min(8).max(30).required(),
})

const router = new Router()

router.post('/users', async(ctx) => {
  const { body } = ctx.request;
  if (body.password != body.passwordConfirmation)
    ctx.throw(400)

  const { error, value } = Joi.validate(body, userSchema)
  if (error)
    ctx.throw(422, error)

  try {
    let user = await Accounts.create(body)
    ctx.body = {'user': user}
  } catch(err) {
    ctx.throw(422)
  }
})


export default router
