const FaunaService = require('@brianmmdev/faunaservice');

exports.handler = (event, context) => {
  let user = context.clientContext.user;
  const service = new FaunaService('fnAEdL-o3WACUR4bTbwAEfhCPU21i6GtkQ-o9Hh-');

  let tasks = service.listRecords('Tasks');
  tasks = tasks.filter((t) => t.userId === user.sub);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tasks),
  };
};
