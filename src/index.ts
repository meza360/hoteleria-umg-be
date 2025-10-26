import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🏨 API de Sistema de Hotelería',
    version: '1.0.0',
    endpoints: {
      rooms: '/api/rooms',
      customers: '/api/customers',
      reservations: '/api/reservations'
    }
  });
});

// Rutas de la API
app.use('/api', routes);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 API documentación: http://localhost:${PORT}/api`);
});