const Intl = require('intl');

function formatToBRL(value) {
    if(typeof value === 'string') {
        value = parseFloat(value)
    }

    const valueFormated = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return valueFormated.format(value)
}

function processFormatValueToBRL(data) {
    const fieldsToFormatToBRL = ['vlTotal', 'vlDescon', 'vlIof', 'vlOutAcr', 'vlMulta', 'vlMora', 'vlPresta'];
    fieldsToFormatToBRL.forEach(field => {
        if (data[field]) {
            data[field] = formatToBRL(data[field]);
        }
    });
}

module.exports = {
    formatToBRL,
    processFormatValueToBRL
}