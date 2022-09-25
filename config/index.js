// const logger = require('pino')({ prettyPrint: true });
// require('dotenv').config();

module.exports = {
  database: {
    dsn: 'mongodb://localhost:37017/scrum-poker',
    status: {
      connected: false,
      error: false,
    },
  },
};
