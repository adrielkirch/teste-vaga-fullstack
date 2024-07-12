const { Server } = require("ws");
const { onConnection } = require("./services/wsService");

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
