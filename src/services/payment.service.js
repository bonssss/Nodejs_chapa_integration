const chapa = require("../config/chapa");
const { generateTxRef } = require("../utils/txref");

class PaymentService {
  async createPayment(payload) {
    const tx_ref = await generateTxRef();

    const options = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      amount: String(payload.amount),
      currency: payload.currency || "ETB",
      tx_ref,
      callback_url: `${process.env.BASE_URL}/payments/webhook`,
      return_url: `${process.env.BASE_URL}/success`,
      customization: {
        title: "Payment Checkout",
        description: "Order Payment",
      },
    };

    if (payload.subaccounts && Array.isArray(payload.subaccounts)) {
      options.subaccounts = payload.subaccounts;
    }

    const response = await chapa.initialize(options);

    return {
      checkout_url: response.data.checkout_url,
      tx_ref,
    };
  }

  async verifyPayment(tx_ref) {
    const response = await chapa.verify({ tx_ref });
    return response.data;
  }

  async getBanks() {
    const response = await chapa.getBanks();
    return response;
  }

  async createSubaccount(payload) {
    const response = await chapa.createSubaccount({
      business_name: payload.business_name,
      account_name: payload.account_name,
      bank_code: payload.bank_code,
      account_number: payload.account_number,
      split_type: payload.split_type,
      split_value: payload.split_value,
    });
    return response;
  }

  async getTransactions(query) {
    if (query && Object.keys(query).length > 0) {
      const axios = require('axios');
      const response = await axios.get("https://api.chapa.co/v1/transactions", {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
        },
        params: query
      });
      return response.data;
    }
    const response = await chapa.getTransactions();
    return response;
  }

  async getTransactionLogs(ref_id) {
    const response = await chapa.getTransactionLogs({ ref_id });
    return response;
  }

  async transfer(payload) {
    const response = await chapa.transfer({
      account_name: payload.account_name,
      account_number: payload.account_number,
      amount: String(payload.amount),
      currency: payload.currency || "ETB",
      reference: payload.reference,
      bank_code: payload.bank_code,
    });
    return response;
  }

  async bulkTransfer(payload) {
    const response = await chapa.bulkTransfer({
      title: payload.title,
      currency: payload.currency || "ETB",
      bulk_data: payload.bulk_data,
    });
    return response;
  }

  async verifyTransfer(tx_ref) {
    const response = await chapa.verifyTransfer({ tx_ref });
    return response;
  }

  async getTransfers(query) {
    if (query && Object.keys(query).length > 0) {
      const axios = require('axios');
      const response = await axios.get("https://api.chapa.co/v1/transfers", {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
        },
        params: query
      });
      return response.data;
    }
    const response = await chapa.getTransfers();
    return response;
  }

  async directCharge(payload) {
    const response = await chapa.directCharge({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      mobile: payload.mobile,
      currency: payload.currency || "ETB",
      amount: String(payload.amount),
      tx_ref: payload.tx_ref,
      type: payload.type,
    });
    return response;
  }

  async authorizeDirectCharge(payload) {
    const response = await chapa.authorizeDirectCharge({
      reference: payload.reference,
      client: payload.client || "",
      type: payload.type,
    });
    return response;
  }

  async cancelPayment(tx_ref) {
    const axios = require('axios');
    const response = await axios.put(`https://api.chapa.co/v1/transaction/cancel/${tx_ref}`, {}, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
      }
    });
    return response.data;
  }

  async getSupportedCurrencies() {
    const axios = require('axios');
    const response = await axios.get('https://api.chapa.co/v1/currency_supported', {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
      }
    });
    return response.data;
  }

  async getBalance(currency) {
    const axios = require('axios');
    let url = 'https://api.chapa.co/v1/balances';
    if (currency) {
      url += `/${currency}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
      }
    });
    return response.data;
  }
}

module.exports = new PaymentService();
