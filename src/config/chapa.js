const { Chapa } = require("chapa-nodejs");

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY,
  logging: true,
  debug: true,
});

module.exports = chapa;
