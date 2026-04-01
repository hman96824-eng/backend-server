import orderService from './service.js';

class orderController {
	static async createOrder(req, res) {
		try {
			const { userId, items, total, status } = req.body;

			const order = await orderService.createOrder(userId, items, total, status);

			res.status(201).json({ message: 'Order created successfully', order });
		} catch (error) {
			console.error('Error creating order:', error.message);

			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message });
			}

			res.status(500).json({ message: 'Internal server error' });
		}
	}

	static async bulkCreateOrders(req, res) {
		try {
			const orders = Array.isArray(req.body) ? req.body : req.body.orders;

			if (!Array.isArray(orders) || orders.length === 0) {
				return res.status(400).json({ message: 'orders array is required' });
			}

			const createdOrders = await orderService.bulkCreateOrders(orders);

			res.status(201).json({
				message: 'Orders created successfully',
				count: createdOrders.length,
				orders: createdOrders
			});
		} catch (error) {
			console.error('Error bulk creating orders:', error.message);

			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message });
			}

			res.status(500).json({ message: 'Internal server error' });
		}
	}
    static async getOrder(req,res){
        try{
            const page = req.query.page || 1
            const limit = req.query.limit || 10

            const orders = await orderService.ordersGet(page,limit)

            res.status(200).json({
                    message: 'Orders fetched successfully',
                    page,
                    limit,
                    data: orders
                });
            
        }catch(error){
            console.error("Error get the orders:", error.message)

        }
    }
}

export default orderController;
