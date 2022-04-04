require('gotrue-js');

auth = new GoTrue({
  APIUrl: 'https://gallant-allen-474ad7.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});

let emailInput = document.querySelector('#emailInput');
let emailBox = document.querySelector('#emailContainer');
const updateEmail = () => {
  let emailVal = document.querySelector('#emailInput').value;
  document.querySelector('#emailDiv').innerHTML = emailVal;

  const user = auth.currentUser();

  user
    .update({ email: emailVal })
    .then((response) => {
      console.log('update email link sent');
      emailBox.style.display = 'none';
      document.querySelector('#emailMessage').style.display = 'block';
      localStorage.setItem(
        'emailDiv.innerHTML',
        JSON.stringify(emailDiv.innerHTML)
      );
    })
    .catch((error) => console.log('Failed to verify recover token: %o', error));
};

emailInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateEmail(e);
  }
});

// Retrieve the object from storage
let newEmail = localStorage.getItem('emailDiv.innerHTML');
emailDiv.innerHTML = JSON.parse(newEmail);
