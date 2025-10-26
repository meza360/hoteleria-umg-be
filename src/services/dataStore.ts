import { Room } from '../models/room';
import { Customer } from '../models/customer';
import { Reservation } from '../models/reservation';

class DataStore {
  private static instance: DataStore;

  public rooms: Room[] = [
    {
      "id": "1760803770433",
      "number": "101",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803852026",
      "number": "102",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803854648",
      "number": "103",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803857647",
      "number": "104",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803860595",
      "number": "105",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803864010",
      "number": "106",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803866855",
      "number": "107",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803869739",
      "number": "108",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803872592",
      "number": "109",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    },
    {
      "id": "1760803876443",
      "number": "110",
      "type": "single",
      "price": 50,
      "available": true,
      "amenities": [
        "WiFi",
        "TV"
      ]
    }
  ];
  public customers: Customer[] = [
    {
      "id": "1",
      "firstName": "Giovani",
      "lastName": "Meza",
      "email": "giovani.meza@gmail.com",
      "phone": "44221111",
      "documentId": "119928730101"
    },
    {
      "id": "2",
      "firstName": "Cristian",
      "lastName": "Orellana",
      "email": "cristian.orellana@gmail.com",
      "phone": "44221421",
      "documentId": "108228730101"
    }
  ];
  public reservations: Reservation[] = [];

  private constructor () { }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }
}

export default DataStore.getInstance();