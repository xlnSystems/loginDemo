require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.fauna.com',
});

module.exports.handler = async (event, context, callback) => {
  let payload = {
    password: 'abc123',
    user_data: {
      name: 'foo bar',
      email: 'foo@bar.com',
    },
  };

  // user_data part of payload can contain all that you want to store about the user but it must contain email for our login to work
  let user_data = payload.user_data;

  const password = payload.password;

  try {
    const user = await client.query(
      q.Create(q.Collection('users'), {
        credentials: {
          password: password,
        },
        data: user_data,
      })
    );

    const response = user.data;

    callback(null, {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify(response),
    });
  } catch (err) {
    console.error(err);

    callback(null, {
      statusCode: 500,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: err }),
    });
  }
};
