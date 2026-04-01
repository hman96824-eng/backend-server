import mongoose from 'mongoose';
import generateCustomId from '../../utils/idGenerator.js';


const userSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true, // Primary Index
        lowercase: true,
        trim: true
    },
    age: { type: Number },
    city: { type: String },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function userIdHook() {
    if (!this._id) {
        this._id = await generateCustomId('users', 'USR');
    }
});

const User = mongoose.model('User', userSchema);

export default User;