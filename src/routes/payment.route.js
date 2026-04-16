const express = require("express");
const controller = require("../controllers/payment.controller");

const router = express.Router();

router.post("/pay", (req, res) => controller.create(req, res));
router.get("/verify/:tx_ref", (req, res) => controller.verify(req, res));
router.post("/webhook", (req, res) => controller.webhook(req, res));
router.get("/webhook", (req, res) => controller.webhook(req, res));
router.get("/banks", (req, res) => controller.getBanks(req, res));
router.post("/subaccount", (req, res) => controller.createSubaccount(req, res));
router.get("/transactions", (req, res) => controller.getTransactions(req, res));
router.get("/transactions/logs/:ref_id", (req, res) => controller.getTransactionLogs(req, res));
router.post("/transfers", (req, res) => controller.transfer(req, res));
router.post("/transfers/bulk", (req, res) => controller.bulkTransfer(req, res));
router.get("/transfers/verify/:tx_ref", (req, res) => controller.verifyTransfer(req, res));
router.get("/transfers", (req, res) => controller.getTransfers(req, res));
router.post("/direct-charge", (req, res) => controller.directCharge(req, res));
router.post("/direct-charge/authorize", (req, res) => controller.authorizeDirectCharge(req, res));
router.put("/cancel/:tx_ref", (req, res) => controller.cancelPayment(req, res));
router.get("/currencies", (req, res) => controller.getSupportedCurrencies(req, res));
router.post("/transfer-approval", (req, res) => controller.transferApproval(req, res));
router.get("/balances", (req, res) => controller.getBalance(req, res));
router.get("/balances/:currency", (req, res) => controller.getBalance(req, res));

module.exports = router;
