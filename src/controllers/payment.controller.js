const paymentService = require("../services/payment.service");

class PaymentController {
  async create(req, res) {
    try {
      const { first_name, last_name, email, amount } = req.body;
      
      // identifying and fixing validation issues
      const validationErrors = {};
      if (!first_name) validationErrors.first_name = "First name is required";
      if (!last_name) validationErrors.last_name = "Last name is required";
      if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        validationErrors.email = "A valid email is required";
      } else if (email.endsWith("example.com")) {
        // Chapa API strictly blocks example.com
        validationErrors.email = "Please provide a real email address instead of example.com";
      }
      if (!amount || isNaN(Number(amount))) {
        validationErrors.amount = "Amount must be a valid number";
      }

      if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({
          message: "Payment validation failed",
          error: validationErrors
        });
      }

      // specifically ensuring the 'amount' field is sent as a string
      req.body.amount = String(amount);

      const result = await paymentService.createPayment(req.body);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      
      // Fixing the '[object Object]' unreadable error from chapa-nodejs HttpException
      if (errorResponse === "[object Object]") {
        errorResponse = "API Validation Error: Please check your payload details (e.g., valid email, supported domain).";
      }

      console.error("❌ Payment initialization error detail:", err);
      
      // Improving error reporting
      const statusCode = err.status || 500;
      res.status(statusCode).json({
        message: "Payment initialization failed",
        error: errorResponse,
      });
    }
  }

  async verify(req, res) {
    try {
      const { tx_ref } = req.params;
      const result = await paymentService.verifyPayment(tx_ref);

      res.json(result);
    } catch (err) {
      const errorData = err.response?.data || err.data || err;
      console.error("❌ Verification error detail:", JSON.stringify(errorData, null, 2));

      res.status(500).json({
        message: "Verification failed",
        error: errorData.message || errorData,
      });
    }
  }

  async webhook(req, res) {
    try {
      const payload = req.method === "GET" ? req.query : req.body;
      console.log(`🔔 Webhook/Callback received from Chapa (${req.method}):`, payload);

      // IMPORTANT:
      // - Validate tx_ref
      // - Update DB payment status here
      // - Prevent duplicate processing

      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({
        message: "Webhook error",
      });
    }
  }

  async getBanks(req, res) {
    try {
      const result = await paymentService.getBanks();
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async createSubaccount(req, res) {
    try {
      const result = await paymentService.createSubaccount(req.body);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async getTransactions(req, res) {
    try {
      const result = await paymentService.getTransactions(req.query);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async getTransactionLogs(req, res) {
    try {
      const { ref_id } = req.params;
      const result = await paymentService.getTransactionLogs(ref_id);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async transfer(req, res) {
    try {
      const result = await paymentService.transfer(req.body);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async bulkTransfer(req, res) {
    try {
      const result = await paymentService.bulkTransfer(req.body);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async verifyTransfer(req, res) {
    try {
      const { tx_ref } = req.params;
      const result = await paymentService.verifyTransfer(tx_ref);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async getTransfers(req, res) {
    try {
      const result = await paymentService.getTransfers(req.query);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async directCharge(req, res) {
    try {
      const result = await paymentService.directCharge(req.body);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async authorizeDirectCharge(req, res) {
    try {
      const result = await paymentService.authorizeDirectCharge(req.body);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async cancelPayment(req, res) {
    try {
      const { tx_ref } = req.params;
      const result = await paymentService.cancelPayment(tx_ref);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async getSupportedCurrencies(req, res) {
    try {
      const result = await paymentService.getSupportedCurrencies();
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }

  async transferApproval(req, res) {
    try {
      const crypto = require("crypto");
      const secret = process.env.CHAPA_APPROVAL_SECRET || process.env.CHAPA_SECRET_KEY;
      const signature = req.headers["chapa-signature"];
      
      const hash = crypto.createHmac("sha256", secret).update(JSON.stringify(req.body)).digest("hex");
      
      if (hash === signature) {
        console.log("✅ Transfer approved via Webhook:", req.body.reference);
        res.sendStatus(200);
      } else {
        console.error("❌ Invalid Chapa Signature for transfer approval");
        res.sendStatus(400);
      }
    } catch (err) {
      res.status(500).json({ message: "Approval error" });
    }
  }

  async getBalance(req, res) {
    try {
      const { currency } = req.params;
      const result = await paymentService.getBalance(currency);
      res.json(result);
    } catch (err) {
      let errorResponse = err.response?.data || err.data || err.message || err;
      if (errorResponse === "[object Object]") errorResponse = "API Action Failed";
      res.status(err.status || 500).json({ message: "Action failed", error: errorResponse });
    }
  }
}

module.exports = new PaymentController();
