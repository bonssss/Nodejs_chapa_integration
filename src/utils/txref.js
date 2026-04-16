const chapa = require("../config/chapa");

async function generateTxRef() {
  return await chapa.genTxRef({
    prefix: "TX",
    size: 12,
  });
}

module.exports = {
  generateTxRef,
};
