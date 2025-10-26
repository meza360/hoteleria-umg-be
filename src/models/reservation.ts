// src/models/Reservation.ts
export interface Reservation {
  id: string;
  customerId: string;
  roomId: string;
  checkIn: Date | String;
  checkOut: Date | String;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}