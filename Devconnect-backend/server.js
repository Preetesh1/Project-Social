const http = require('http');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const { initSocket } = require('./src/socket');
const logger = require('./src/utils/logger');
require('./src/config/env');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
initSocket(server);

const start = async () => {
  await connectDB();
  server.listen(PORT, () => {
    logger.info(`DevConnect server running on port ${PORT} [${process.env.NODE_ENV}]`);
  });
};

start();
