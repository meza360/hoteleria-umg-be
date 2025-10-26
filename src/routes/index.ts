import { Router } from 'express';
import roomRoutes from './roomRoutes';
import customerRoutes from './customerRoutes';
import reservationRoutes from './reservationRoutes';

const router = Router();

router.use('/rooms', roomRoutes);
router.use('/customers', customerRoutes);
router.use('/reservations', reservationRoutes);

export default router;