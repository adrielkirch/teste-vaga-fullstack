const fs = require("fs");
const csv = require("csv-parser");
const { Transform } = require("stream");
const { processCpfOrCnpj } = require("./cnpjCpfUtil");

async function readFileAsync(folder, filename) {
  const filePath = `${__dirname}/../files/${folder}/${filename}.csv`;
  const outputPath = `${__dirname}/../files/processed/${filename}_processed.csv`;

  return new Promise((resolve, reject) => {
    const writableStreams = fs.createWriteStream(outputPath, {
      encoding: "utf8",
    });
    let headersWritten = false;

    const transformStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        if (!headersWritten) {
          const headers = `${Object.keys(chunk).join(",")},nrCpfCnpjValid\n`;
          writableStreams.write(headers);
          headersWritten = true;
        }
        const isValidCpfOrCnpj = processCpfOrCnpj(chunk);

        const csvLine = `${Object.values(chunk).join(
          ","
        )},${isValidCpfOrCnpj}\n`;

        writableStreams.write(csvLine);
        callback();
      },
    });

    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

    readStream
      .pipe(csv())
      .pipe(transformStream)
      .on("finish", () => {
        writableStreams.end();
        resolve("File processing complete.");
      })
      .on("error", (err) => {
        writableStreams.end();
        reject(err);
      });
  });
}

module.exports = {
  readFileAsync,
};
