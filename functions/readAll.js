require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.fauna.com',
});

// exports.handler = async (event, context) => {
//   console.log('Function `readAll` invoked');
//   client
//     .query(q.Get(q.Index('health_by_indicator')))
//     .then((ret) => console.log(ret))
//     .catch((err) => console.error('Error: %s', err));
// };
exports.handler = (event, context, callback) => {
  console.log(`Function 'readAll' invoked`);
  return (
    client
      //.query(q.Get(q.Index('health_by_indicator')))
      //.query(q.Paginate(q.Indexes()))
      //.query(q.Paginate(q.Match(q.Ref('indexes/health_by_indicator'))))

      //queries select field data
      .query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('newHealth')), {
            size: 12,
          }),
          q.Lambda('X', q.Select(['data', 'Indicator Name'], q.Get(q.Var('X'))))
        )
      )

      //queries whole collection
      // .query(
      //   q.Map(
      //     q.Paginate(q.Documents(q.Collection('newHealth'))),
      //     q.Lambda((x) => q.Get(x))
      //   )
      // )

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
      })
  );
};
