import { Request, Response } from 'express';
import { ReservationService, RoomService, CustomerService } from '../services';

const roomService = new RoomService();
const customerService = new CustomerService();
const reservationService = new ReservationService(roomService, customerService);

export const createReservation = (req: Request, res: Response) => {
  try {
    const { customerId, roomId, checkIn, checkOut } = req.body;
    const reservation = reservationService.createReservation(
      customerId,
      roomId,
      new Date(checkIn),
      new Date(checkOut)
    );
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllReservations = (req: Request, res: Response) => {
  const reservations = reservationService.getAllReservations();
  res.json(reservations);
};

export const getReservationById = (req: Request, res: Response) => {
  const reservation = reservationService.getReservationById(req.params.id);
  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).json({ error: 'Reservación no encontrada' });
  }
};

export const getReservationsByCustomer = (req: Request, res: Response) => {
  const reservations = reservationService.getReservationsByCustomer(req.params.customerId);
  res.json(reservations);
};

export const cancelReservation = (req: Request, res: Response) => {
  try {
    const reservation = reservationService.cancelReservation(req.params.id);
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getStatistics = (req: Request, res: Response) => {
  const stats = reservationService.getStatistics();
  res.json(stats);
};