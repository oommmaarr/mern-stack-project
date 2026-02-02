import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import serviceRoutes from './routes/service.route.js'
import orderRoutes from './routes/order.route.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;
app.use(cookieParser());
app.use(cors({
    origin: "https://mern-stack-project-5evu.vercel.app/",
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/service' , serviceRoutes)
app.use('/api/order' ,  orderRoutes )
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();