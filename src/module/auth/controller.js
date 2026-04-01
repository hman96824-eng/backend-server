import authService from './service.js';



class authController  {
    static async createUser(req, res) {
        try {
            const { name, email, age, city } = req.body;

            const user = await authService.createUser(name, email, age, city);

            
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            console.error('Error creating user:', error.message);
            if (error.code === 11000) {
                return res.status(409).json({ message: 'Email already exists' });
            }

            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message });
            }

            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async bulkCreateUsers(req, res) {
        try {
            const users = Array.isArray(req.body) ? req.body : req.body.users;

            if (!Array.isArray(users) || users.length === 0) {
                return res.status(400).json({ message: 'users array is required' });
            }

            const createdUsers = await authService.bulkCreateUsers(users);

            res.status(201).json({
                message: 'Users created successfully',
                count: createdUsers.length,
                users: createdUsers
            });
        } catch (error) {
            console.error('Error bulk creating users:', error.message);

            if (error.code === 11000) {
                return res.status(409).json({ message: 'One or more emails already exist' });
            }

            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message });
            }

            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default authController;