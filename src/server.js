import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/user.routes.js";

import "./libs/auth/local.strategy.js";

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/users', userRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Error 404!'});
});

// Error handler
app.use((req, res) => {
  res.status(500).json({ message: 'Server error!'});
});

export default app;
