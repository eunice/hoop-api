import mocha from 'mocha'
import knexCleaner from 'knex-cleaner'
import {knex} from '../src/db'

after(async() => {
  await knexCleaner.clean(knex);
});
