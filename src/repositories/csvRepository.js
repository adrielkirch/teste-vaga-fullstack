const fileStream = require("../streams/fileStream");

async function processData(
  folder,
  filename,
  clients = null,
  clientId = null,
  sendToClientCallBack = null
) {
  try {
    const result = await fileStream.processFileAsync(
      folder,
      filename,
      clients,
      clientId,
      sendToClientCallBack
    );
    return result;
  } catch (err) {
    throw err; 
  }
}

module.exports = {
  processData,
};
