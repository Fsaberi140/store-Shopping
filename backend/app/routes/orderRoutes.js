const express = require("express");
const orderController = require("../controllers/orderController");

// Create an orderRouter instance using express.Router()
const orderRouter = express.Router();

// Get all orders
orderRouter.get("/orders", orderController.getAllOrders);

// Get order by ID
orderRouter.get("/orders/:id", orderController.getOrderById);

// Get orders by user ID
orderRouter.get("/users/:userId/orders", orderController.getOrdersByUserId);

// Create order
orderRouter.post("/orders", orderController.createOrder);

// Update order
orderRouter.put("/orders/:id", orderController.updateOrder);

// Delete order
orderRouter.delete("/orders/:id", orderController.deleteOrder);

module.exports = orderRouter;
