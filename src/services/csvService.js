const csvRepository = require("../repositories/csvRepository");

async function processData(
  folder,
  filename,
  clients = null,
  clientId = null,
  sendToClientCallBack = null
) {
  try {
    const data = await csvRepository.processData(
      folder,
      filename,
      clients,
      clientId,
      sendToClientCallBack
    );
    return data;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  processData,
};
