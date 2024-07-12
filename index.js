const express = require('express');
const bodyParser = require('body-parser');
const dataRoute = require('./src/route');
const { PORT } = require('./config');
const http = require('http');
const WebSocketServer = require('./src/websocket');

async function startServers() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));
  app.use(bodyParser.json());
  app.use('/data', dataRoute);

  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`HTTP server and WebSocket server are running on port ${PORT}`);
  });
}

startServers().catch((err) => console.error('Error starting servers:', err));
