import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import connectDB from './config/mongodb.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Backend is running and connected to MongoDB! 🚀');
});


const startServer = async () => {
    try {
       app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
       
       
        await connectDB();
    } catch (error) {
        console.error('❌ Server is not connected:', error.message);
        process.exit(1);
    }
};

startServer();
