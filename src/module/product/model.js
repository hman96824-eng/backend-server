import mongoose from 'mongoose';
import generateCustomId from '../../utils/idGenerator.js';


function getProductPrefixFromCategory(category = '') {
  const normalized = String(category).toUpperCase().replace(/[^A-Z0-9]/g, '');
  const prefix = normalized.slice(0, 3);
  return prefix || 'PRD';
}


const productSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 }
});

productSchema.pre('save', async function productIdHook() {
  if (!this._id) {
    const prefix = getProductPrefixFromCategory(this.category);
    this._id = await generateCustomId(`products_${prefix}`, prefix);
  }
});

// Indices for high-performance searching/sorting
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;