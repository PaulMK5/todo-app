const DB = process.env.DB_NAME || 'fm-todo';

module.exports = {DB: `mongodb://localhost:27017/${DB}`}
