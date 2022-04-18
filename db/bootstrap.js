require('dotenv').config();
const faunadb = require('faunadb');

console.log('Creating FaunaDB database...');

const createCollections = (key) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: key,
    domain: 'db.fauna.com',
  });

  client
    .query(q.CreateCollection({ name: 'appointments' }))
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));
};

const createIndexes = (key) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: key,
    domain: 'db.fauna.com',
  });

  client
    .query(
      q.CreateIndex({
        name: 'appointments_by_id',
        permissions: { read: 'public' },
        source: q.Collection('appointments'),
        terms: [{ field: ['data', 'id'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));

  client
    .query(
      q.CreateIndex({
        name: 'appointments_by_name',
        permissions: { read: 'public' },
        source: q.Collection('appointments'),
        terms: [{ field: ['data', 'name'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));

  client
    .query(
      q.CreateIndex({
        name: 'appointments_by_date',
        permissions: { read: 'public' },
        source: q.Collection('appointments'),
        terms: [{ field: ['data', 'date'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));

  client
    .query(
      q.CreateIndex({
        name: 'appointments_by_description',
        permissions: { read: 'public' },
        source: q.Collection('appointments'),
        terms: [{ field: ['data', 'description'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));
};
if (!process.env.FAUNADB_SECRET) {
  console.error('FaunaDB Secret Key not found!');
} else {
  createCollections(process.env.FAUNADB_SECRET);
  createIndexes(process.env.FAUNADB_SECRET);
}

// run this command when wanting to create new collections or indexes node ./db/bootstrap.js
