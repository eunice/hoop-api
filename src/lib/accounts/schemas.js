import Joi from 'joi'

export const userSchema = Joi.object().keys({
  email: Joi.string().email(),
  username: Joi.string(),
  passwordDigest: Joi.string(),
  firstName: Joi.string().alphanum(),
  lastName: Joi.string().alphanum()

})

