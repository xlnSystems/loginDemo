require('gotrue-js');

auth = new GoTrue({
  APIUrl: 'https://gallant-allen-474ad7.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});
// let recoveryButton = document.querySelector('#changePass');
// recoveryButton.addEventListener('click', () => {
//   const user = auth.currentUser();
//   const email = user.email;
//   const password = user.password;
//   auth;
//   // .requestPasswordRecovery(email)
//   user
//     .update({
//       email: email.value,
//       password: password.value,
//     })
//     .then((response) =>
//       console.log('Logged in as %s', JSON.stringify({ response }))
//     )
//     .catch((error) => console.log('Failed to verify recover token: %o', error));
//   closeMessage();
// });

// const user = auth.currentUser();

// user.update({
//      email: email.value,
//      password: password.value,
//    });

const updatePass = () => {
  let passVal = document.querySelector('#passInput').value;
  document.querySelector('#passDiv').innerHTML = passVal;
  const user = auth.currentUser();
  user
    .update({
      password: passVal,
    })

    .then((response) => {
      console.log('Logged in as %s');
      passInput.style.display = 'none';
      document.querySelector('#passMessage').style.display = 'block';
      let passStars = passDiv.innerHTML;
      for (i = 0; i < passStars.length; i++) {
        let total = passStars.length;
        let a = '*';
        passDiv.innerHTML = a.repeat(total);
        localStorage.setItem(
          'passDiv.innerHTML',
          JSON.stringify(passDiv.innerHTML)
        );
      }
    })
    .catch((error) => console.log('Failed to verify recover token: %o', error));
};

let passInput = document.querySelector('#passInput');
passInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updatePass(e);
  }
});

// Retrieve the object from storage
let newPass = localStorage.getItem('passDiv.innerHTML');
passDiv.innerHTML = JSON.parse(newPass);
