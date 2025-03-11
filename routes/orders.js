const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
*/

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Places a new order by associating it with a customer and adding multiple products with their quantities.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerID
 *               - products
 *               - total
 *             properties:
 *               customerID:
 *                 type: string
 *                 description: The ID of the customer placing the order (MongoDB ObjectId).
 *                 example: "65e0f0d9c3a2b6a8e7b1c3d4"
 *               products:
 *                 type: array
 *                 description: List of products being ordered with productID and quantity.
 *                 items:
 *                   type: object
 *                   required:
 *                     - productID
 *                     - quantity
 *                   properties:
 *                     productID:
 *                       type: string
 *                       description: The ID of the product (MongoDB ObjectId).
 *                       example: "65e1a2b3c4d5e6f7g8h9i0j1"
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the product ordered.
 *                       example: 2
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *                 description: The current status of the order.
 *                 default: "pending"
 *                 example: "pending"
 *               total:
 *                 type: number
 *                 description: The total cost of the order.
 *                 example: 199.99
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the created order.
 *                   example: "65e2f3g4h5i6j7k8l9m0n1o2"
 *                 customerID:
 *                   type: string
 *                   description: The ID of the customer who placed the order.
 *                   example: "65e0f0d9c3a2b6a8e7b1c3d4"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productID:
 *                         type: string
 *                         example: "65e1a2b3c4d5e6f7g8h9i0j1"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                 total:
 *                   type: number
 *                   example: 199.99
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error message
 */
router.post('/orders', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retrieve a single order
 *     description: Retrieve an order by its ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the order.
 *         schema:
 *           type: string
 *           example: "65e2f3g4h5i6j7k8l9m0n1o2"
 *     responses:
 *       200:
 *         description: An order object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65e2f3g4h5i6j7k8l9m0n1o2"
 *                 customerID:
 *                   type: string
 *                   example: "65e0f0d9c3a2b6a8e7b1c3d4"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productID:
 *                         type: string
 *                         example: "65e1a2b3c4d5e6f7g8h9i0j1"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                 total:
 *                   type: number
 *                   example: 199.99
 *       404:
 *         description: Order not found.
 */
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an existing order
 *     description: Update details of an existing order by its ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the order.
 *         schema:
 *           type: string
 *           example: "65e2f3g4h5i6j7k8l9m0n1o2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerID:
 *                 type: string
 *                 example: "65e0f0d9c3a2b6a8e7b1c3d4"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: string
 *                       example: "65e1a2b3c4d5e6f7g8h9i0j1"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *                 example: "completed"
 *               total:
 *                 type: number
 *                 example: 249.99
 *     responses:
 *       200:
 *         description: Order updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 customerID:
 *                   type: string
 *                 products:
 *                   type: array
 *                 status:
 *                   type: string
 *                 total:
 *                   type: number
 *       400:
 *         description: Bad request. Invalid input data.
 *       404:
 *         description: Order not found.
 */
router.put('/orders/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     description: Delete an existing order by its ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the order.
 *         schema:
 *           type: string
 *           example: "65e2f3g4h5i6j7k8l9m0n1o2"
 *     responses:
 *       200:
 *         description: Order successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order deleted successfully
 *       404:
 *         description: Order not found.
 */
router.delete('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;