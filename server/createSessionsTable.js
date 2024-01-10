const db = require('./db');

async function createSessionsTable() {
  try {
    const res = await db.query(`
      create table if not exists user_sessions (
        sid varchar NOT NULL PRIMARY KEY NOT DEFERRABLE INITIALLY IMMEDIATE COLLATE "default",
        sess json NOT NULL,
        expire timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE);
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "user_sessions" ("expire");
      create table if not exists users (
        user_id uuid NOT NULL PRIMARY KEY NOT DEFERRABLE INITIALLY IMMEDIATE DEFAULT gen_random_uuid(),
        email varchar NOT NULL UNIQUE,
        email_verified boolean NOT NULL DEFAULT false,
        password varchar,
        name varchar NOT NULL,
        hashed_password varchar,
        salt varchar,
        user_name varchar UNIQUE
      );
      create table if not exists federated_credentials (
        federated_credential_id uuid NOT NULL PRIMARY KEY NOT DEFERRABLE INITIALLY IMMEDIATE DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES users(user_id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE,
        provider varchar NOT NULL,
        subject varchar NOT NULL
      );
    `);
    console.log('Sessions table initialized')
    await db.end();
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      console.log('Could not connect to database. Please make sure that the database is running and that the connection details are correct.');
    } else {
      console.log(err);
    }
    await db.end();
    process.exit(1);
  }
}

createSessionsTable();