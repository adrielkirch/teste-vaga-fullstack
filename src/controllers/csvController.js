const { StatusCodes } = require("http-status-codes");
const csvService = require("../services/csvService");

async function processData(req, res) {
  try {
    const { folder, filename } = req.body;
    const data = await csvService.processData(
      folder,
      filename,
      null,
      null,
      null
    );
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

module.exports = {
  processData,
};
