const Intl = require("intl");

function formatToBRL(value) {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  const valueFormated = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valueFormated.format(value);
}

function processFormatValueToBRL(data) {
  const fieldsToFormatToBRL = [
    "vlTotal",
    "vlDescon",
    "vlIof",
    "vlOutAcr",
    "vlMulta",
    "vlMora",
    "vlPresta",
  ];
  fieldsToFormatToBRL.forEach((field) => {
    if (data[field]) {
      data[field] = formatToBRL(data[field]);
    }
  });
}

function validateProvision(data) {
  const { vlTotal, qtPrestacoes, vlPresta } = data;

  const expectedProvision = vlTotal / qtPrestacoes;
  const expectedProvisionInt = Math.round(expectedProvision);
  const vlProvisionInt = Math.round(vlPresta);

  if (expectedProvisionInt !== vlProvisionInt) {
    return "0";
  }

  return "1";
}

module.exports = {
  formatToBRL,
  processFormatValueToBRL,
  validateProvision,
};
