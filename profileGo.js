require('gotrue-js');

auth = new GoTrue({
  APIUrl: 'https://gallant-allen-474ad7.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});
let recoveryButton = document.querySelector('#changePass');
recoveryButton.addEventListener('click', () => {
  const user = auth.currentUser();
  const email = user.email;
  document.create;

  auth
    .requestPasswordRecovery(email)
    .then((response) =>
      console.log('Logged in as %s', JSON.stringify({ response }))
    )
    .catch((error) => console.log('Failed to verify recover token: %o', error));
  closeMessage();
});
