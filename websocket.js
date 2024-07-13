const { Server } = require("ws");
const { onConnection } = require("./src/services/websocketService");

class WebSocketServer {
  constructor(server) {
    this.wss = new Server({ server });
    this.clients = new Map();
    try {
      this.wss.on("connection", (ws) => {
        onConnection(ws, this.clients);
      });
    } catch(err) {
      console.error(err);
    }
    
  }
}

module.exports = WebSocketServer;
