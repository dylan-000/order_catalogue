const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * @swagger
 * tags:
 *      name: Products
 *      description: Product management APIs
*/

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product in the database.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Frosted Flakes
 *               manufacturer:
 *                 type: string
 *                 example: Kellogs
 *               price:
 *                 type: Number
 *                 example: 5.99
 *     responses:
 *       201:
 *         description: product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60c72b2f9b1d8t5a2c8f9e4b
 *                 name:
 *                   type: string
 *                   example: Frosted Flakes
 *                 manufacturer:
 *                   type: string
 *                   example: Kellogs
 *                 price:
 *                   type: Number
 *                   example: 5.99
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
router.post('/products', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: The product description by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60c72b2f9b1d8t5a2c8f9e4b
 *                 name:
 *                   type: string
 *                   example: Frosted Flakes
 *                 manufacturer:
 *                   type: string
 *                   example: Kellogs
 *                 price:
 *                   type: Number
 *                   example: 5.99
 *       404:
 *         description: Product not found.
 */
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60c72b2f9b1d8t5a2c8f9e4b
 *                   name:
 *                     type: string
 *                     example: Frosted Flakes
 *                   manufacturer:
 *                     type: string
 *                     example: Kellogs
 *                   price:
 *                     type: number
 *                     example: 5.99
 *       400:
 *         description: Bad request. Invalid input data.
 */
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a product by ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Frosted Flakes
 *               manufacturer:
 *                 type: string
 *                 example: Kellogs
 *               price:
 *                 type: Number
 *                 example: 5.99
 *     responses:
 *       200:
 *         description: The product was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60c72b2f9b1d8t5a2c8f9e4b
 *                 name:
 *                   type: string
 *                   example: Frosted Flakes
 *                 manufacturer:
 *                   type: string
 *                   example: Kellogs
 *                 price:
 *                   type: Number
 *                   example: 5.99
 *       400:
 *         description: Bad request. Invalid input data.
 *       404:
 *         description: Product not found.
 */
router.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: The product was deleted successfully.
 *       404:
 *         description: Product not found.
 */
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;