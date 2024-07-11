const fs = require("fs");
const csv = require("csv-parser");
const { Transform } = require("stream");
const { processCpfOrCnpj } = require("./cnpjCpfUtil");
const { processFormatValueToBRL } = require("./financialUtil");

let headersWritten = false;

async function createWriteStream(outputPath) {
  return fs.createWriteStream(outputPath, { encoding: "utf8" });
}

async function createTransformStream(writableStreams) {
  return new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      if (!headersWritten) {
        const headers = `${Object.keys(chunk).join(",")},nrCpfCnpjValid\n`;
        writableStreams.write(headers);
        headersWritten = true;
      }
      const isValidCpfOrCnpj = processCpfOrCnpj(chunk);

      processFormatValueToBRL(chunk);

      const csvLine = `${Object.values(chunk).join(",")},${isValidCpfOrCnpj}\n`;

      writableStreams.write(csvLine);
      callback();
    },
  });
}

async function createReadStream(filePath) {
  return fs.createReadStream(filePath, { encoding: "utf8" });
}

async function processFileAsync(folder, filename) {
  const filePath = `${__dirname}/../files/${folder}/${filename}.csv`;
  const outputPath = `${__dirname}/../files/processed/${filename}_processed.csv`;

  try {
    const writableStreams = await createWriteStream(outputPath);
    const readStream = await createReadStream(filePath);
    const transformStream = await createTransformStream(writableStreams);

    readStream
      .pipe(csv())
      .pipe(transformStream)
      .on("finish", () => {
        writableStreams.end();
        resolve("Finished");
      })
      .on("error", (err) => {
        writableStreams.end();
        console.error("Error processing file:", err);
      });
  } catch (err) {
    console.error("Error setting up streams:", err);
  }
}

module.exports = {
  processFileAsync,
};
