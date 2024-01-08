require('dotenv').config();

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  GOOGLE_OAUTH_CREDENTIALS: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  },
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_URL: process.env.CLIENT_URL
}

module.exports = config;