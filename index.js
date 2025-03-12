const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
const PORT = process.env.PORT || 3000;

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Order Catalogue API Documentation',
            version: '1.0.0',
            description: 'Documenting my APIs for the ordering catalogue as a part of the CMPSC 421 Lab 2 assignment.',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
  components: {
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
        },
    },
},
    },
    apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes - importing the customerRouter, productRouter, and orderRouter from the routes/ directory
const customerRouter = require('./routes/customers');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
app.use('/apis', productRouter);
app.use('/apis', customerRouter);
app.use('/apis', orderRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});