    import productService from './service.js';

    class productController {
        static async createProduct(req, res) {
            try {
                const { name, price, category, stock } = req.body;

                const product = await productService.createProduct(name, price, category, stock);

                res.status(201).json({ message: 'Product created successfully', product });
            } catch (error) {
                console.error('Error creating product:', error.message);

                if (error.name === 'ValidationError') {
                    return res.status(400).json({ message: error.message });
                }

                res.status(500).json({ message: 'Internal server error' });
            }
        }

        static async bulkCreateProducts(req, res) {
            try {
                const products = Array.isArray(req.body) ? req.body : req.body.products;

                if (!Array.isArray(products) || products.length === 0) {
                    return res.status(400).json({ message: 'products array is required' });
                }

                const createdProducts = await productService.bulkCreateProducts(products);

                res.status(201).json({
                    message: 'Products created successfully',
                    count: createdProducts.length,
                    products: createdProducts
                });
            } catch (error) {
                console.error('Error bulk creating products:', error.message);

                if (error.name === 'ValidationError') {
                    return res.status(400).json({ message: error.message });
                }

                res.status(500).json({ message: 'Internal server error' });
            }
        }
        static async getProducts(req, res) {
            try{
                const page = req.query.page || 1;
                const limit = req.query.limit || 10;

                const products = await productService.getProducts(page, limit);
                
                res.status(200).json({
                    message: 'Products fetched successfully',
                    page,
                    limit,
                    data: products
                });
            }catch(error){
                console.error('Error fetching products:', err.message);

                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    export default productController;
