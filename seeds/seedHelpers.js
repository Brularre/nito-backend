const names = [
  'Luis',
  'José',
  'Andrés',
  'Sandra',
  'Claudia',
  'Ramón',
  'Josefina',
  'Raúl',
  'Cecilia',
  'Jorge',
  'Ana',
  'Pedro',
  'Bárbara',
  'Mario',
  'María',
  'Armando',
  'Jennifer',
  'Joaquín',
];

const areas = [
  'Automotriz',
  'Construcción',
  'Electricidad',
  'Limpieza',
  'Pintura',
  'Plomería',
];

const cities = ['Viña del Mar'];
const ratings = [1, 2, 3, 4, 5];

function generateRandomPosition() {
  const bounds = [
    [-33.060287, -71.617523],
    [-32.956428, -71.496355],
  ];
  const lat = bounds[0][0] + Math.random() * (bounds[1][0] - bounds[0][0]);
  const lng = bounds[0][1] + Math.random() * (bounds[1][1] - bounds[0][1]);
  return [lat, lng];
}

module.exports = { names, areas, cities, ratings, generateRandomPosition };
