require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.fauna.com',
});
exports.handler = (event, context, callback) => {
  console.log(`Function 'Entry' invoked`);
  return client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Entry')), {
          size: 12,
        }),
        q.Lambda('X', {
          id: q.Select(
            ['ts'],

            q.Get(q.Var('X'))
          ),
          name: q.Select(
            ['data', 'name'],

            q.Get(q.Var('X'))
          ),
          date: q.Select(
            ['data', 'date'],

            q.Get(q.Var('X'))
          ),
          time: q.Select(
            ['data', 'time'],

            q.Get(q.Var('X'))
          ),
        })
      )
    )
    .then((response) => {
      console.log('success', response);
      return callback(null, {
        statusCode: 200,
        headers: {
          /* Required for CORS support to work */
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify(response),
      });
    })
    .catch((error) => {
      console.log('error', error);
      return callback(null, {
        statusCode: 400,
        headers: {
          /* Required for CORS support to work */
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify(error),
      });
    });
};
