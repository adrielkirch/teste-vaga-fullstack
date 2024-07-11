const { Server } = require("ws");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const csv = require("csv-parser");
const readline = require("readline");

class WebSocketServer {
  constructor(server) {
    this.wss = new Server({ server });
    this.clients = new Map();
    this.wss.on("connection", (ws) => {
      this.onConnection(ws)
    });
  }

  async readFileAsync(clientId, folder, filename) {
    const filePath = `${__dirname}/../files/${folder}/${filename}`;
    const startTimestamp = Date.now();
    let rowCount = 0;

    return new Promise((resolve, reject) => {
      const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath, { encoding: "utf8" }),
        crlfDelay: Infinity,
      });

      readInterface.on("line", (line) => {
        rowCount++;
        this.sendToClient(clientId, JSON.stringify({ line }));
      });

      readInterface.on("close", () => {
        const endTimestamp = Date.now();
        const processingTime = (endTimestamp - startTimestamp) / 1000; // in seconds
        resolve({ rowCount, processingTime });
      });

      readInterface.on("error", (err) => {
        reject(err);
      });
    });
  }

  sendToClient(clientId, message) {
    const client = this.clients.get(clientId);
    if (client) {
      client.send(message);
    } else {
      console.error(`Client ${clientId} not found.`);
    }
  }

  async onConnection(ws) {
    const clientId = uuidv4();
    this.clients.set(clientId, ws);

    console.log(`Client ${clientId} has connected`);

    ws.on("message", async (message) => {
      this.onMessage(message, clientId);
    });

    ws.on("close", async () => {
      this.onClose(clientId);
    });

    ws.send("Welcome to WebSocket server!\nCommands:\n READ <folder>/<filename> - Read and process CSV file\nExample: READ unprocessed/data.csv\n");
  }
  async onMessage(message, clientId) {
    let command = message.toString("utf-8");

    if (command.startsWith("READ")) {
      command = command.split("READ ")[1];
      let [folder, filename] = command.split("/");

      try {
        const { rowCount, processingTime } = await this.readFileAsync(
          clientId,
          folder,
          filename
        );
        this.sendToClient(
          clientId,
          JSON.stringify({
            message: `Read ${rowCount} rows in ${processingTime} seconds`,
          })
        );
      } catch (err) {
        console.error(`Error processing file: ${err.message}`);
        this.sendToClient(clientId, JSON.stringify({ error: err.message }));
      }
    }
  }

  async onClose(clientId) {
    this.clients.delete(clientId);
    console.log(`Client ${clientId} has disconnected`);
  }

}

module.exports = WebSocketServer;
