// src/models/Room.ts
export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite';
  price: number;
  available: boolean;
  amenities: string[];
}