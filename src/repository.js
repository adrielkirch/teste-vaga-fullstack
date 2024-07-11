const fileStream = require("./fileStream");

async function getData(folder, filename) {
  try {
    const data = await fileStream.readFileAsync(folder, filename);
    return data;
  } catch (err) {
    console.error("Error getting data:", err);
    return null;
  }
}

async function processData(folder, filename) {
  try {
    const data = await fileStream.readFileAsync(folder, filename);
    return data;
  } catch (err) {
    console.error("Error getting data:", err);
    return null;
  }
}


module.exports = {
  getData,
  processData,
};
