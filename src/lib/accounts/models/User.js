import Base from '../../Base'

export default class User extends Base {
  static get tableName() {
    return 'users'
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        email: {type: 'string'},
        username: {type: 'string'},
        firstName: {type: 'string'},
        lastName: {type: 'string'}
      }
    }
  }
}
