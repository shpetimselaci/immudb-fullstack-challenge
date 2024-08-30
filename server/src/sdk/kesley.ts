import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'node-postgres';
import { config } from '~/config';

import { TransactionsTable } from '../modules/transactions/schema';

export interface Database {
  transactions: TransactionsTable;
}

export let pool = new Pool({
  host: config.IMMUDB_HOST,
  password: config.IMMUDB_PASSWORD,
  user: config.IMMUDB_USER,
  port: 5432,
  database: config.IMMUDB_DB,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<Database>({
  dialect: dialect,
  log(event) {
    console.log('EVENT', event);
  },
});
