import mongoose from 'mongoose';
import generateCustomId from '../../utils/idGenerator.js';

const orderSchema = new mongoose.Schema({
  _id: { type: String },
  userId: { 
    type: String,
    ref: 'User', 
    required: true 
  },
  items: [
    {
      productId: { 
        type: String,
        ref: 'Product', 
        required: true 
      },
      quantity: { type: Number, default: 1 }
    }
  ],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  }
});

orderSchema.pre('save', async function orderIdHook() {
  if (!this._id) {
    this._id = await generateCustomId('orders', 'ORD');
  }
});

// Indices for user-specific order history and status tracking
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;