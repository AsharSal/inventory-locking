# 🔒 Inventory Locking System – Node.js, Express, Sequelize, MySQL

This project demonstrates **database row-level locking** using Sequelize and MySQL to prevent **overselling inventory** in an e-commerce scenario. It showcases how concurrent requests can be handled safely using **transactions with `SELECT ... FOR UPDATE`**.

---

## 🚀 Features

- ✅ Sequelize + MySQL setup
- ✅ Row-level locking using transactions
- ✅ Purchase endpoint with safe stock deduction
- ✅ Concurrent request test simulation
- ✅ Sequelize CLI for models, migrations, and seeders

---

## 🔐 Why Locking?

In concurrent systems (like web APIs), multiple users can try to buy the same product at the same time. Without locking:

- Users may all read the same stock value
- They all reduce the stock
- Database ends up overselling the product ❌

### 💡 Solution: Row-Level Locking

Using `SELECT ... FOR UPDATE` inside a transaction locks the product row, allowing only one operation to proceed at a time.

---

## 📦 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Axios (for test simulation)

---

## 📁 Project Structure

inventory-locking-app/
├── models/ # Sequelize models
├── migrations/ # DB schema
├── seeders/ # Initial product data
├── routes/ # API routes
├── test/ # Concurrent purchase test
├── config/ # Sequelize DB config
├── app.js # Express app
├── package.json

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/your-username/inventory-locking-app.git
cd inventory-locking-app
npm install
```

### 2. commands to run

npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
npm start
node test/concurrentPurchaseTest.js

---

## 📄

Expected Output:
If the product has 5 units:

✅ 5 requests succeed

❌ 5 requests fail with Insufficient stock

This confirms locking works, and only one transaction updates the row at a time.

## 📬 API Endpoint

POST /api/purchase

```json
{
  "productId": 1,
  "quantity": 1
}
```

Response

```json
{
  "message": "Purchase successful",
  "remainingStock": 4
}
```
