const fileStream = require("../streams/fileStream");

async function getData(folder, filename) {
  try {
    const data = await fileStream.processFileAsync(folder, filename);
    return data;
  } catch (err) {
    console.error("Error getting data:", err);
    return null;
  }
}

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
    console.error("Error getting data:", err);
    return null;
  }
}

module.exports = {
  getData,
  processData,
};
