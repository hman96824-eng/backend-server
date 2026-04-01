import User from './model.js';

class authService {
    static async createUser(name, email, age, city) {

        const user =  User({ name, email, age, city });

        return await user.save();
    }

    static async bulkCreateUsers(users) {
        const sanitizedUsers = users.map((user) => ({
            name: user.name,
            email: user.email,
            age: user.age,
            city: user.city
        }));

        return await User.create(sanitizedUsers);
    }
}

export default authService;