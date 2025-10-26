import { Router } from 'express';
import * as roomController from '../controllers/roomController';

const router = Router();

router.post('/', roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.get('/available', roomController.getAvailableRooms);
router.get('/:id', roomController.getRoomById);
router.patch('/:id/availability', roomController.updateRoomAvailability);
router.delete('/:id', roomController.deleteRoom);

export default router;