# Order Catalogue
CMPSC 421 lab to design, develop, and document RESTful API using Node.js and Express.js, with a focus on asynchronous programming and efficient data handling.

## Implementation
#### MongoDB Models
All necessary MongoDB schemas were created for the data persistance aspect of this lab. The included models are: 
- Customer Model:
```
const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    middleName: {type: String, required: false},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
})
```
- Product Model:
```
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    price: {type: Number, required: true}
})
```
- Order Model:
```
const orderSchema = new mongoose.Schema({

    // We want to reference the Customer model here so that we associate each order with a specific customer.
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },

    // Similarly, for each order we reference multiple productIDs from the Product model. Using the [] notation because there may be many products.
    products: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, min: 1 } // Ensure quantity is at least 1
        }
    ],

    // Indicate the status of the order: pending, completed, or cancelled.
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
      },

    // Lastly, we create the total field of the order to 
    total: {type: Number, required: true}
})
```
#### Routing
All of the models implemented with MongoDB have corresponding CRUD APIs created with express, so each model has corresponing Create, Read, Update, and Delete operations.

#### Documentation
To document the APIs, swagger jsdoc comments were provided with the API implementations so that when the server runs, if the user navigates to the '/api-docs' section of the server, they can see all of the APIs and how they should be used.

#### Testing
Tests are yet to be implemented with postman.