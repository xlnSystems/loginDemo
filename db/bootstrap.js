require('dotenv').config();
const faunadb = require('faunadb');

console.log('Creating FaunaDB database...');

// const createCollections = (key) => {
//   const q = faunadb.query;

//   const client = new faunadb.Client({
//     secret: key,
//     domain: 'db.fauna.com',
//   });

//   client
//     .query(q.CreateCollection({ name: 'poverty' }))
//     .then((ret) => console.log('Success: %s', ret))
//     .catch((err) => console.error('Error: %s', err));
// };

const createIndexes = (key) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: key,
    domain: 'db.fauna.com',
  });
  // Poverty by Indicator Index
  client
    .query(
      q.CreateIndex({
        name: 'poverty_by_indicator',
        permissions: { read: 'public' },
        source: q.Collection('poverty'),
        terms: [{ field: ['data', 'Indicator Name'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));

  client
    .query(
      q.CreateIndex({
        name: 'poverty_by_rateForWhite',
        permissions: { read: 'public' },
        source: q.Collection('poverty'),
        terms: [{ field: ['data', 'Rate_for_White'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));

  client
    .query(
      q.CreateIndex({
        name: 'poverty_by_rateForBlack',
        permissions: { read: 'public' },
        source: q.Collection('poverty'),
        terms: [{ field: ['data', 'Rate_for_Black'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));
};
if (!process.env.FAUNADB_SECRET) {
  console.error('FaunaDB Secret Key not found!');
} else {
  //createCollections(process.env.FAUNADB_SECRET);
  createIndexes(process.env.FAUNADB_SECRET);
}

// run this command when wanting to create new collections or indexes node ./db/bootstrap.js
