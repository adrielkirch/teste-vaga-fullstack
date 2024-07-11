const { StatusCodes } = require("http-status-codes");
const dataService = require("./service");

async function getData(req, res) {
  try {
    const { folder, filename } = req.query;
    const data = await dataService.getData(folder, filename);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function processData(req, res) {
  try {
    const { folder, filename } = req.body;
    const data = await dataService.processData(folder, filename);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

module.exports = {
  getData,
  processData,
};
