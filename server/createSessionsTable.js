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
    `);
    console.log('Sessions table initialized')
    await db.end();
  } catch (err) {
    console.log(err);
  }
}

createSessionsTable();