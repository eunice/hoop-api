TABASE_URL, DATABASE_URL;
if (process.env.USE_DOCKER_DNS == 'true') {
  DATABASE_URL = 'postgresql://postgres:postgres@postgres:5432/hoop_dev?ssl_mode=disable'
  TEST_DATABASE_URL = 'postgresql://postgres:postgres@postgres:5432/hoop_test?ssl_mode=disable'
} else {
  DATABASE_URL = process.env.DATABASE_URL
  TEST_DATABASE_URL = process.env.TEST_DATABASE_URL

}

module.exports = {
  development: {
      client: 'pg',
      connection: DATABASE_URL
    },
  production: {
      client: 'pg',
      connection: DATABASE_URL
    },
  test: {
      client: 'pg',
      connection: TEST_DATABASE_URL
    }
}
