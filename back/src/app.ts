import express from 'express';
import reservaRoutes from './routes/reservaRoutes';
import { connectDB } from './config/database';
import path from 'path';
import cors from 'cors';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api', reservaRoutes);
app.get('/', (req, res) => res.render('index')); // Página inicial

export default app;
