import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiUUID from 'chai-uuid'
import mocha from 'mocha'
import server from '../testServer'

let should = chai.should()


chai.use(chaiHttp)
chai.use(chaiUUID)

describe('users', () => {
  beforeEach(async(done) => {
    done()
  })

  describe('/POST users', () => {
    it('should create a user', async() => {
      let res = await chai
        .request(server)
        .post('/users')
        .send({email: 'test@example.com', password: 'abcde1234', passwordConfirmation: 'abcde1234', firstName: 'test', lastName: 'testeson', username: 'test'})
      res.should.have.status(200)
      res.body.should.have.property('token')
      res.body.token.should.be.a.uuid()
    })

    it('should return 422 if missing username', async() => {
      let res = await chai
        .request(server)
        .post('/users')
        .send({email: 'test@example.com', password: 'abcde1234', passwordConfirmation: 'abcde1234', firstName: 'test', lastName: 'testeson'})
      res.should.have.status(422)

    })
  });
});

