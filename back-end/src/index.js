import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import serviceRoutes from './routes/service.route.js';
import orderRoutes from './routes/order.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;

// Trust proxy is required for secure cookies on platforms like Railway/Vercel
app.set('trust proxy', 1);

app.use(cookieParser());

const allowedOrigins = [
    "https://mern-stack-project-5evu.vercel.app",
    "https://mern-stack-project-nine-chi.vercel.app",
    "https://mern-stack-project-5evu-oiddrztml.vercel.app",
    "http://localhost:3000",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const isVercel = origin.startsWith("https://mern-stack-project") && origin.endsWith(".vercel.app");
        const isLocal = origin === "http://localhost:3000";

        if (isVercel || isLocal) {
            callback(null, true);
        } else {
            console.log("CORS Rejected Origin:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/order', orderRoutes);


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
