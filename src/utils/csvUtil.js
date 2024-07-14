function processHeaders(data, extraHeaders = []) {
  const headers = Object.keys(data).concat(extraHeaders);
  return `${headers.join(";")}\n`;
}

function countLineItems(data) {
  return data.split(";").length;
}

function formatLine(value) {
  if (
    typeof value === "string" &&
    (value.includes(",") || value.includes('"'))
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value; 
}

module.exports = {
  processHeaders,
  countLineItems,
  formatLine,
};
