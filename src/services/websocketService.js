const { v4: uuidv4 } = require("uuid");
const csvService= require("./csvService");

async function onConnection(ws, clients) {
  const clientId = uuidv4();
  clients.set(clientId, ws);

  console.log(`Client ${clientId} has connected`);

  ws.on("message", async (message) => {
    onMessage(clients, message, clientId);
  });

  ws.on("close", async () => {
    onClose(clients, clientId);
  });

  ws.send(
    "Welcome to WebSocket server!\n\nCommands:\n\n PROCESS <folder>/<filename> - Read and process CSV file\n\nExample: \n\nPROCESS unprocessed/data.csv\n"
  );
}

async function onMessage(clients, message, clientId) {
  let command = message.toString("utf-8");

  if (command.startsWith("PROCESS")) {
    command = command.split("PROCESS ")[1];
    let [folder, filename] = command.split("/");

    try {
      const processedMessage  = await csvService.processData(
        folder,
        filename,
        clients,
        clientId,
        sendToClient
      );
      sendToClient(
        clients,
        clientId,
        JSON.stringify({
          message: processedMessage,
        })
      );
    } catch (err) {
      console.error(`Error processing file: ${err.message}`);
      sendToClient(clients, clientId, JSON.stringify({ error: err.message }));
    }
  }
}

function onClose(clients, clientId) {
  clients.delete(clientId);
  console.log(`Client ${clientId} has disconnected`);
}

function sendToClient(clients, clientId, message) {
  const client = clients.get(clientId);
  if (client) {
    client.send(message);
  } else {
    console.error(`Client ${clientId} not found.`);
  }
}

module.exports = {
  onConnection,
};
