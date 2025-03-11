const mongoose = require('mongoose');

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

module.exports = mongoose.model('Order', orderSchema);