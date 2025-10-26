import { Request, Response } from 'express';
import { RoomService } from '../services';

const roomService = new RoomService();

export const createRoom = (req: Request, res: Response) => {
  try {
    const room = roomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllRooms = (req: Request, res: Response) => {
  const rooms = roomService.getAllRooms();
  res.json(rooms);
};

export const getAvailableRooms = (req: Request, res: Response) => {
  const rooms = roomService.getAvailableRooms();
  res.json(rooms);
};

export const getRoomById = (req: Request, res: Response) => {
  const room = roomService.getRoomById(req.params.id);
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ error: 'Habitación no encontrada' });
  }
};

export const updateRoomAvailability = (req: Request, res: Response) => {
  const { available } = req.body;
  const room = roomService.updateRoomAvailability(req.params.id, available);
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ error: 'Habitación no encontrada' });
  }
};

export const deleteRoom = (req: Request, res: Response) => {
  const success = roomService.deleteRoom(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Habitación no encontrada' });
  }
};