exports.handler = async (event, context) => {
  const redirectUrl = 'sasa.html';

  return {
    statusCode: 302,
    headers: {
      Location: redirectUrl,
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({}),
  };
};
