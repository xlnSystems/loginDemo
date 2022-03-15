require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.fauna.com',
});

module.exports.handler = async (event, context, callback) => {
  let payload = {
    email: 'foo@bar.com',
    password: 'abc123',
  };

  const email = payload.email;

  const password = payload.password;

  try {
    const response = await client.query(
      q.Login(q.Match(q.Index('users_by_email'), email), { password: password })
    );

    callback(null, {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify(response),
    });
  } catch (err) {
    console.error(err);

    callback(null, {
      statusCode: 400,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: err }),
    });
  }
};
