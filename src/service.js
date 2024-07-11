const dataRepository = require("./repository");

async function getData(folder, filename) {
  const data = await dataRepository.getData(folder, filename);
  return data;
}

async function processData(folder, filename) {
  const data = await dataRepository.processData(folder, filename);
  return data;
}

module.exports = {
  getData,
  processData
};
