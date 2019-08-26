import User from './models/User'
import bcrypt from 'bcrypt'
import {userSchema} from './schemas'
import Joi from 'joi'

const saltRounds = 10


export default class Accounts {
  static async create(body) {
    let passwordDigest = await bcrypt.hash(body.password, saltRounds)

    let user = {
      email: body.email,
      passwordDigest: passwordDigest,
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username
    }

    let user_res = await User.query().insert(user)
    return user_res
  }

  static async login(email, password) {
    let found_user = await this.findUserByEmail(email)
    if (!found_user) {
      return null
    }
    let match = await bcrypt.compare(password, found_user.passwordDigest)
  }

  static async findUserByEmail(email) {
    return await User.query().findOne('email', email)

  }

  static async check_if_username_exists(username) {
    let username_exists = await User
      .query()
      .where('username', username)
    if (username_exists)
      return True
    return False
  }
}
