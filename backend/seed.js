require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Customer = require("./models/Customer"); // Adicione esta linha

// Dados de exemplo atualizados
const customers = [
  { name: "Cliente 1", email: "cliente1@example.com" },
  { name: "Cliente 2", email: "cliente2@example.com" },
];

const products = [
  { name: "Smartphone X", category: "Eletrônicos", price: 2999.9 },
  { name: "Notebook Pro", category: "Eletrônicos", price: 5499.9 },
  { name: "Camisa Casual", category: "Vestuário", price: 149.9 },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🔃 Seeding database...");

    // Limpar dados antigos
    await Product.deleteMany();
    await Order.deleteMany();
    await Customer.deleteMany();

    // Criar customers
    const createdCustomers = await Customer.insertMany(customers);

    // Inserir produtos
    const createdProducts = await Product.insertMany(products);

    // Criar pedidos usando os customers e products criados
    const orders = [
      {
        customerId: createdCustomers[0]._id,
        items: [
          { productId: createdProducts[0]._id, quantity: 2, price: 2999.9 },
          { productId: createdProducts[2]._id, quantity: 1, price: 149.9 },
        ],
        orderDate: new Date("2024-01-15"),
        status: "COMPLETED",
      },
      {
        customerId: createdCustomers[1]._id,
        items: [
          { productId: createdProducts[1]._id, quantity: 1, price: 5499.9 },
        ],
        orderDate: new Date("2024-03-01"),
        status: "COMPLETED",
      },
    ];

    await Order.insertMany(orders);

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
