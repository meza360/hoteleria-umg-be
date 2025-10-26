import { Room } from '../models';
import dataStore from './dataStore';

export class RoomService {
  createRoom(room: Omit<Room, 'id'>): Room {
    const newRoom: Room = {
      id: Date.now().toString(),
      ...room
    };
    dataStore.rooms.push(newRoom);
    return newRoom;
  }

  getAllRooms(): Room[] {
    return dataStore.rooms;
  }

  getAvailableRooms(): Room[] {
    console.log('Fetching available rooms');
    return dataStore.rooms.filter(room => room.available);
  }

  getRoomById(id: string): Room | undefined {
    return dataStore.rooms.find(room => room.id === id);
  }

  updateRoomAvailability(id: string, available: boolean): Room | null {
    const room = this.getRoomById(id);
    if (room) {
      room.available = available;
      return room;
    }
    return null;
  }

  deleteRoom(id: string): boolean {
    const index = dataStore.rooms.findIndex(room => room.id === id);
    if (index !== -1) {
      dataStore.rooms.splice(index, 1);
      return true;
    }
    return false;
  }
}