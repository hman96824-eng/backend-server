import Order from './model.js';

class orderService {
	static async createOrder(userId, items, total, status) {
		const order = Order({ userId, items, total, status });
		return await order.save();
	}

	static async bulkCreateOrders(orders) {
		const sanitizedOrders = orders.map((order) => ({
			userId: order.userId,
			items: Array.isArray(order.items)
				? order.items.map((item) => ({
					productId: item.productId,
					quantity: item.quantity
				}))
				: [],
			total: order.total,
			status: order.status
		}));

		return await Order.create(sanitizedOrders);
	}
    static async ordersGet(page,limit){
        const skip = (page -1) *limit

       return await Order.find().skip(skip).limit(limit);
    }
}

export default orderService;
