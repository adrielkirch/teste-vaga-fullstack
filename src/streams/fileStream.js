const fs = require("fs");
const csv = require("csv-parser");
const { Transform } = require("stream");
const { processCpfOrCnpj } = require("../utils/cnpjCpfUtil");
const { processFormatValueToBRL, validateProvision } = require("../utils/financialUtil");

let totalValid = 0

function createWriteStream(outputPath) {
  return fs.createWriteStream(outputPath, { encoding: "utf8" });
}

function createReadStream(filePath) {
  return fs.createReadStream(filePath, { encoding: "utf8" });
}

function createTransformStream(
  writableStream,
  clients = null,
  clientId = null,
  sendToClientCallBack = null
) {
  let headersWritten = false;
  

  return new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      try {
        if (!headersWritten) {
          const headers = `${Object.keys(chunk).join(",")},nrCpfCnpjValid,vlPrestaValid\n`;
          writableStream.write(headers);
          headersWritten = true;
        }
        const isValidCpfOrCnpj = processCpfOrCnpj(chunk);
        const isValidVlPrest = validateProvision(chunk)

        const csvLine = `${Object.values(chunk).join(
          ","
        )},${isValidCpfOrCnpj},${isValidVlPrest}\n`;

        processFormatValueToBRL(chunk);

        if (clients && clientId && sendToClientCallBack) {
          sendToClientCallBack(clients, clientId, csvLine);
        }
        writableStream.write(csvLine);
        callback();
      } catch (err) {
        console.error("Error in transform stream:", err);
        callback(err);
      }
    },
  });
}

async function processFileAsync(
  folder,
  filename,
  clients = null,
  clientId = null,
  sendToClientCallBack = null
) {
  if (!filename) {
    return Promise.reject(new Error("Filename is not defined"));
  }

  const filePath = `${__dirname}/../../files/${folder}/${filename}`;
  const outputPath = `${__dirname}/../../files/processed/${filename}_processed.csv`;

  return new Promise((resolve, reject) => {
    const startDateTime = new Date();
    const writableStream = createWriteStream(outputPath);

    const readStream = createReadStream(filePath);
    readStream.on("error", (err) => {
      console.error("Error reading file:", err);
      writableStream.end();
      reject(new Error(`Error reading file: ${err.message}`));
    });

    const transformStream = createTransformStream(
      writableStream,
      clients,
      clientId,
      sendToClientCallBack
    );

    readStream
      .pipe(csv())
      .pipe(transformStream)
      .on("finish", () => {
        const endDateTime = new Date();
        const secondsProcessing = (endDateTime - startDateTime) / 1e3;
        writableStream.end();
        resolve(
          `Processed ${filename} in ${secondsProcessing.toFixed(1)} seconds`
        );
      })
      .on("error", (err) => {
        writableStream.end();
        reject(new Error(`Error processing file: ${err.message}`));
      });
  });
}

module.exports = {
  processFileAsync,
  createReadStream,
  createWriteStream,
};
