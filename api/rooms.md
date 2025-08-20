
## Listado de cuartos

POST HTTP 1.1
https://api:port/api/administrative/rooms

```json
{
    "filters": [
        {
            "type": "date",
            "start": "18-18-2000",
            "top": "18-18-2000"
        },
        {
            "type": "price",
            "start": 3000.00,
            "top": 5000.00
        },
        {
            "type": "size",
            "start": "S",
            "top": "M"
        }
    ]
}
```


```json
{
    "isSuccess": true | false,
    "value": [
        {
            "id": "66affab69d655ad0996fc633",
            "name": "La presidenta",
            "description": "Habitacion 2 camas M",
            "imageUrl": "modelo_a.jpg",
            "price": 4000,
            "size": "S" | "M" | "L",
            "available": true | false,
            "datesReserved": [
                "18-18-2000",
                "18-18-2000",
                "18-18-2000"
            ]
        },
        {
            "id": "66affab69d655ad0996fc633",
            "name": "La presidenta 2",
            "description": "Habitacion 1 camas M",
            "imageUrl": "modelo_b.jpg",
            "price": 4000,
            "size": "S" | "M" | "L",
            "available": true | false
        }
    ]
}
```

## Listado de extras

GET HTTP 1.1
https://api:port/api/administrative/rooms/extras

```json
{
    "isSuccess": true | false,
    "value": [
        {
            "name": "Jacuzzi",
            "price": 200
        },
        {
            "name": "Pool",
            "price": 200
        }
    ]
}
```

## Hacer reserva
POST HTTP 1.1

```json
{
    "room": {
        "id": "66affab69d655ad0996fc633",
        "name": "La presidenta",
        "dates": [
            "20-20-2000",
            "20-20-2000",
            "20-20-2000"
        ],
        "totalNights": 3,
        "unitPrice": 3000.00
    },
    "extras":[
        {
            "name": "Jacuzzi",
            "price": 3000
        },
        {
            "name": "Pool",
            "price": 4000
        }
    ],
    "billTo": {
        "name": "Giovani",
        "lastName": "Meza",
        "taxId": "",
    },
    "payment": {
        "paymentMethod": "onPremise",
        "total": 4000
    },
    "seller": {
        "id": "",
        "name": "booking.com"
    }
}
```