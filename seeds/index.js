const mongoose = require('mongoose');
const Worker = require('../models/worker');

const {
  names,
  areas,
  cities,
  ratings,
  generateRandomPosition,
} = require('./seedHelpers');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/nito');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => console.log('Connected successfully to database'));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Worker.deleteMany({});
  for (let i = 0; i < 5; i += 1) {
    const worker = new Worker({
      name: sample(names),
      area: sample(areas),
      city: sample(cities),
      rating: sample(ratings),
      location: generateRandomPosition(),
    });
    // eslint-disable-next-line no-await-in-loop
    await worker.save();
  }
};

seedDB();
