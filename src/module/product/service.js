import Product from './model.js';

class productService {
	static async createProduct(name, price, category, stock) {
		const product = Product({ name, price, category, stock });
		return await product.save();
	}

	static async bulkCreateProducts(products) {
		const sanitizedProducts = products.map((product) => ({
			name: product.name,
			price: product.price,
			category: product.category,
			stock: product.stock
		}));

		return await Product.create(sanitizedProducts);
	}
    static async getProducts(page, limit) { 
        const skip = (page -1) * limit
        return await Product.find().skip(skip).limit(limit);
    }
}

export default productService;
