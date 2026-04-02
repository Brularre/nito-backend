const mongoose = require('mongoose');
const Worker = require('../models/worker');
require('dotenv').config({ path: '../.env' });

const {
  names,
  areas,
  cities,
  generateRandomPosition,
} = require('./seedHelpers');

const { MONGODB_URI = 'mongodb://127.0.0.1:27017/nito' } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI);

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
      location: generateRandomPosition(),
    });
    // eslint-disable-next-line no-await-in-loop
    await worker.save();
  }
  console.log('Seeded 5 workers successfully');
};

// Added: await the call, wrap in try/catch, and exit when done.
// Previously seedDB() was fire-and-forget with no error handling and
// the process never exited, leaving the DB connection open indefinitely.
(async () => {
  try {
    await seedDB();
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
})();
