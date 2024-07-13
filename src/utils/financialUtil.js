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
    "vlAtual",
    "vlMov",
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

function calcVlMov(data) {
  const pendingProvisions = data.qtPrestacoes - data.nrPresta;
  const vlMov = (data.vlPresta * pendingProvisions) + data.vlAtual;
  return vlMov;
}

function validateMovValue(vlMov, vlTotal) {
  return Math.round(vlTotal) !== Math.round(vlMov) ? "0" : "1";
}

module.exports = {
  formatToBRL,
  processFormatValueToBRL,
  validateProvision,
  calcVlMov,
  validateMovValue,
};
