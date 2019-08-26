const { Model } = require('objection');
const Knex = require('knex');
const{ knexSnakeCaseMappers} = require('objection')

var DATABASE_URL = process.env.DATABASE_URL

if (process.env.USE_DOCKER_DNS == 'true') {
  DATABASE_URL = 'postgresql://postgres:postgres@postgres:5432/hoop_dev?ssl_mode=disable'
} else {
  DATABASE_URL = process.env.DATABASE_URL
}

if (process.env.NODE_ENV == 'test') {
  DATABASE_URL = 'postgresql://postgres:postgres@postgres:5432/hoop_test?ssl_mode=disable'
}


// Initialize knex
export const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: DATABASE_URL,
  postProcessResponse: (result, queryContext) => {
    // TODO: add special case for raw results (depends on dialect)
    console.log(result)
    if (Array.isArray(result)) {
      // return result.map(row => convertToCamel(row));
    } else {
      // return convertToCamel(result);
    }
  },

  ...knexSnakeCaseMappers()
});

// Give the knex object to objection.
Model.knex(knex);




