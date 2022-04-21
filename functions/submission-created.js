require('dotenv').config();
require('isomorphic-fetch');

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
