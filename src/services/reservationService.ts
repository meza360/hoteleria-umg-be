import { Reservation } from '../models';
import { RoomService } from './roomService';
import { CustomerService } from './customerService';
import dataStore from './dataStore';

export class ReservationService {
  constructor(
    private roomService: RoomService,
    private customerService: CustomerService
  ) {}

  createReservation(
    customerId: string,
    roomId: string,
    checkIn: Date,
    checkOut: Date
  ): Reservation {
    // Validar que el cliente existe
    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }

    // Validar que la habitación existe
    const room = this.roomService.getRoomById(roomId);
    if (!room) {
      throw new Error('Habitación no encontrada');
    }

    // Validar que la habitación está disponible
    if (!room.available) {
      throw new Error('Habitación no disponible');
    }

    // Validar fechas
    if (checkIn >= checkOut) {
      throw new Error('La fecha de check-in debe ser anterior al check-out');
    }

    // Calcular precio total
    const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * room.price;

    const newReservation: Reservation = {
      id: Date.now().toString(),
      customerId,
      roomId,
      checkIn,
      checkOut,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date()
    };

    dataStore.reservations.push(newReservation);
    this.roomService.updateRoomAvailability(roomId, false);

    return newReservation;
  }

  getAllReservations(): Reservation[] {
    return dataStore.reservations;
  }

  getReservationById(id: string): Reservation | undefined {
    return dataStore.reservations.find(reservation => reservation.id === id);
  }

  getReservationsByCustomer(customerId: string): Reservation[] {
    return dataStore.reservations.filter(reservation => reservation.customerId === customerId);
  }

  cancelReservation(id: string): Reservation | null {
    const reservation = this.getReservationById(id);
    if (!reservation) {
      throw new Error('Reservación no encontrada');
    }

    if (reservation.status === 'cancelled') {
      throw new Error('La reservación ya está cancelada');
    }

    reservation.status = 'cancelled';
    this.roomService.updateRoomAvailability(reservation.roomId, true);

    return reservation;
  }

  getStatistics() {
    const totalReservations = dataStore.reservations.length;
    const activeReservations = dataStore.reservations.filter(r => r.status === 'confirmed').length;
    const totalRevenue = dataStore.reservations
      .filter(r => r.status === 'confirmed' || r.status === 'completed')
      .reduce((sum, r) => sum + r.totalPrice, 0);

    return {
      totalReservations,
      activeReservations,
      cancelledReservations: dataStore.reservations.filter(r => r.status === 'cancelled').length,
      completedReservations: dataStore.reservations.filter(r => r.status === 'completed').length,
      totalRevenue
    };
  }
}