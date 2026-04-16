# Chapa Payment Integration Service

A comprehensive Node.js and Express-based service for integrating the [Chapa Payment Gateway](https://chapa.co/). This service leverages the official `chapa-nodejs` SDK to provide a robust API for handling payments, transfers, subaccounts, and more.

## 🚀 Features

- **Payment Handling**: Initialize and verify payments with automatic transaction reference generation.
- **Webhooks**: Pre-configured endpoint for receiving and processing Chapa webhooks.
- **Transfers**: Individual and bulk transfers to Ethiopian banks.
- **Subaccounts**: Create and manage subaccounts for split payments.
- **Bank Operations**: Fetch a supported list of banks for transfers.
- **Direct Charge**: Support for direct payment methods.
- **Balance & Currency**: Retrieve wallet balances and supported currencies.
- **Transaction History**: List transactions and fetch detailed transaction logs.
- **Security**: HMCS signature verification for transfer approvals.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **SDK**: [chapa-nodejs](https://www.npmjs.com/package/chapa-nodejs)
- **Utilities**: `axios`, `dotenv`, `uuid`, `nodemon`

## 📦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- A Chapa account with API keys (available in your [Chapa Dashboard](https://dashboard.chapa.co/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bonssss/Nodejs_chapa_integration.git
   cd chapa-payment-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file and add your `CHAPA_SECRET_KEY` and other configurations.

### Running the Service

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```
  The server will start on `http://localhost:3000` (by default).

## 🔌 API Endpoints

### Payment Operations

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/payments/pay` | Initialize a payment. |
| `GET` | `/payments/verify/:tx_ref` | Verify a transaction status. |
| `PUT` | `/payments/cancel/:tx_ref` | Cancel a transaction. |

### Transfer & Bank Operations

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/payments/banks` | Get a list of supported banks. |
| `POST` | `/payments/transfers` | Initiate a single transfer. |
| `POST` | `/payments/transfers/bulk` | Initiate bulk transfers. |
| `GET` | `/payments/transfers/verify/:tx_ref` | Verify a transfer. |
| `GET` | `/payments/transfers` | List all transfers. |

### Subaccounts & Direct Charge

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/payments/subaccount` | Create a new subaccount. |
| `POST` | `/payments/direct-charge` | Initiate a direct charge. |
| `POST` | `/payments/direct-charge/authorize` | Authorize a direct charge. |

### System & Information

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/payments/transactions` | List all transactions. |
| `GET` | `/payments/transactions/logs/:ref_id` | Get detailed transaction logs. |
| `GET` | `/payments/currencies` | Get supported currencies. |
| `GET` | `/payments/balances` | Get account balances. |
| `POST` | `/payments/webhook` | Webhook listener (Publicly accessible). |

## 📝 Usage Example: Initializing a Payment

**Request**:
`POST /payments/pay`

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "amount": "100",
  "currency": "ETB"
}
```

**Response**:
```json
{
  "checkout_url": "https://checkout.chapa.co/checkout/payment/...",
  "tx_ref": "TX-123456789"
}
```

## 📂 Project Structure

```text
src/
├── config/        # Configuration files (Chapa SDK initialization)
├── controllers/   # Request handlers and business logic
├── routes/        # API route definitions
├── services/      # Abstraction for Chapa API calls
├── utils/         # Helper functions (e.g., tx_ref generator)
├── app.js         # Express app configuration
└── server.js      # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
