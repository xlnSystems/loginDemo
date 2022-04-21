// exports.handler = (event, context, callback) => {
//   let payload = JSON.parse(event.body).payload;
//   console.log(payload);
// };

require('dotenv').config();
require('isomorphic-fetch');
// const faunadb = require('faunadb');
// const q = faunadb.query;
// const client = new faunadb.Client({
//   secret: process.env.FAUNADB_SECRET,
//   domain: 'db.fauna.com',
// });

// module.exports.handler = async (event, context, callback) => {
//   const payload = {
//     id: '12345',
//     name: 'Leslie Smith',
//     date: '04/20/2022',
//     description: '10 am',
//     type: 'event',
//     color: 'orange',
//   };

//   // appointment_data part of payload can contain all that you want to store about the user but it must contain email for our login to work
//   let appointment_data = payload;

//   try {
//     const user = await client.query(
//       q.Create(q.Collection('appointments'), {
//         data: appointment_data,
//       })
//     );

//     const response = user.data;

//     callback(null, {
//       statusCode: 200,
//       headers: {
//         /* Required for CORS support to work */
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       },
//       body: JSON.stringify(response),
//     });
//   } catch (err) {
//     console.error(err);

//     callback(null, {
//       statusCode: 500,
//       headers: {
//         /* Required for CORS support to work */
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       },
//       body: JSON.stringify({ error: err }),
//     });
//   }
// };

// exports.handler = async (event) => {
//   const body = JSON.parse(event.body);
//   const { name, email, date, time } = body.payload.data;

//   const response = await fetch('https://graphql.fauna.com/graphql', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
//     },
//     body: JSON.stringify({
//       query: `
//         mutation($name: String!, $email: String!, $date: String!, $time: String!) {
//             createEntry(data: { name: $name, email: $email, date: $date, time: $time } {
//             _id
//             name
//             email
//             date
//             description
//           }
//         }
//       `,
//       variables: {
//         name,
//         email,
//         date,
//         time,
//       },
//     }),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));

//   return {
//     statusCode: 302,
//     headers: {
//       Location: 'booking-success.html',
//       'Cache-Control': 'no-cache',
//     },
//     body: JSON.stringify({}),
//   };
// };

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const data = body.payload.data;
  console.log({ data });
  const { name, email, date, time } = data;

  console.log({ name, email, date, time });

  const response = await fetch('https://graphql.fauna.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
    },
    body: JSON.stringify({
      query: `
        mutation($name: String!, $email: String!, $date: String!, $time: String!) {
            createEntry(data: { name: $name, email: $email, date: $date, time: $time }) {
            _id
            name
            email
            date
            time
          }
        }      
      `,
      variables: {
        name,
        email,
        date,
        time,
      },
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  console.log({ response });

  return {
    statusCode: 302,
    headers: {
      Location: 'booking-success.html',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({}),
  };
};
