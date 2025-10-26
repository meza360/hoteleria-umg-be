// test-api.js
// Script simple para probar la API del hotel

const API_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Iniciando pruebas de la API...\n');

  try {
    // TEST 1: Crear habitaciones
    console.log('📋 TEST 1: Crear habitaciones');
    const room1 = await fetch(`${API_URL}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: '101',
        type: 'single',
        price: 50,
        available: true,
        amenities: ['WiFi', 'TV']
      })
    });
    const room1Data = await room1.json();
    console.log('✅ Habitación 101 creada:', room1Data.id);

    const room2 = await fetch(`${API_URL}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: '102',
        type: 'double',
        price: 80,
        available: true,
        amenities: ['WiFi', 'TV', 'Minibar']
      })
    });
    const room2Data = await room2.json();
    console.log('✅ Habitación 102 creada:', room2Data.id);

    // TEST 2: Ver todas las habitaciones
    console.log('\n📋 TEST 2: Ver todas las habitaciones');
    const roomsResponse = await fetch(`${API_URL}/rooms`);
    const rooms = await roomsResponse.json();
    console.log(`✅ Total de habitaciones: ${rooms.length}`);

    // TEST 3: Crear cliente
    console.log('\n📋 TEST 3: Crear cliente');
    const customerResponse = await fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@email.com',
        phone: '+502 1234-5678',
        documentId: '1234567890101'
      })
    });
    const customer = await customerResponse.json();
    console.log('✅ Cliente creado:', customer.id);

    // TEST 4: Crear reservación
    console.log('\n📋 TEST 4: Crear reservación');
    const reservationResponse = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId: customer.id,
        roomId: room1Data.id,
        checkIn: '2025-10-15',
        checkOut: '2025-10-20'
      })
    });
    const reservation = await reservationResponse.json();
    console.log('✅ Reservación creada:', reservation.id);
    console.log('💰 Total a pagar:', reservation.totalPrice);

    // TEST 5: Ver estadísticas
    console.log('\n📋 TEST 5: Ver estadísticas');
    const statsResponse = await fetch(`${API_URL}/reservations/statistics`);
    const stats = await statsResponse.json();
    console.log('✅ Estadísticas:');
    console.log('   - Total reservaciones:', stats.totalReservations);
    console.log('   - Reservaciones activas:', stats.activeReservations);
    console.log('   - Ingresos totales: $', stats.totalRevenue);

    // TEST 6: Cancelar reservación
    console.log('\n📋 TEST 6: Cancelar reservación');
    const cancelResponse = await fetch(`${API_URL}/reservations/${reservation.id}/cancel`, {
      method: 'PATCH'
    });
    const cancelledReservation = await cancelResponse.json();
    console.log('✅ Reservación cancelada, estado:', cancelledReservation.status);

    // TEST 7: Verificar habitación disponible nuevamente
    console.log('\n📋 TEST 7: Verificar disponibilidad');
    const availableRoomsResponse = await fetch(`${API_URL}/rooms/available`);
    const availableRooms = await availableRoomsResponse.json();
    console.log(`✅ Habitaciones disponibles: ${availableRooms.length}`);

    console.log('\n✨ ¡Todas las pruebas pasaron exitosamente!\n');
    console.log('🎯 Tu API está funcionando correctamente.');
    console.log('📌 Puedes continuar con el siguiente paso.\n');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.log('\n⚠️  Verifica que el servidor esté corriendo en http://localhost:3000\n');
  }
}

// Ejecutar las pruebas
testAPI();