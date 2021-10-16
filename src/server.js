import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World! :D');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Error 404!'});
});

// Error handler
app.use((req, res) => {
  res.status(500).json({ message: 'Server error!'});
});

export default app;
