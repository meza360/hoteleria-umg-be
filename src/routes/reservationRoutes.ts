import { Router } from 'express';
import * as reservationController from '../controllers/reservationController';

const router = Router();

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getAllReservations);
router.get('/statistics', reservationController.getStatistics);
router.get('/:id', reservationController.getReservationById);
router.get('/customer/:customerId', reservationController.getReservationsByCustomer);
router.patch('/:id/cancel', reservationController.cancelReservation);

export default router;