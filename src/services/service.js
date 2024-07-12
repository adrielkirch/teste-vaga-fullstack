const dataRepository = require("../repositories/repository");

async function getData(folder, filename) {
  const data = await dataRepository.getData(folder, filename);
  return data;
}

async function processData(
  folder,
  filename,
  clients = null,
  clientId = null,
  sendToClientCallBack = null
) {
  const data = await dataRepository.processData(folder, filename,clients, clientId, sendToClientCallBack );
  return data;
}

module.exports = {
  getData,
  processData,
};
