const { cpf, cnpj } = require("cpf-cnpj-validator");

function isValidCPF(value) {
  return cpf.isValid(value);
}

function isValidCNPJ(value) {
  return cnpj.isValid(value);
}

function supposedToBeCpf(value) {
  const len = value.length;
  if (len === 9 || len === 10 || len === 11) {
    return true;
  }
  return false;
}

function supposedToBeCnpj(value) {
  const len = value.length;
  if (len >= 12) {
    return true;
  }
  return false;
}

function processCpfOrCnpj(data) {
  value = data["nrCpfCnpj"];
  const isSupposedToBeCnpj = supposedToBeCnpj(value);
  let result = "0"
  
  if (isSupposedToBeCnpj) {
    result = isValidCNPJ(value) ? "1" : "0";
    return result;
  }

  result = isValidCPF(value) ? "1" : "0";
  return result;
}

module.exports = {
  supposedToBeCpf,
  supposedToBeCnpj,
  isValidCNPJ,
  isValidCPF,
  processCpfOrCnpj
};
