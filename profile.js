// Let's find these DOM elements!
const nameDiv = document.querySelector('#nameInput');
const emailDiv = document.querySelector('#emailInput');
const streetDiv = document.querySelector('#streetDiv');
const cityDiv = document.querySelector('#cityDiv');
const stateDiv = document.querySelector('#stateDiv');
const zipDiv = document.querySelector('#zipDiv');

// format_stringify is a function that takes in an object and returns formatted JSON
const format_stringify = (data) => JSON.stringify(data, null, 2);
// showCurrentInfo updates the UI to show the current user data passed in to it
const showCurrentInfo = (user) => {
  const str = format_stringify(user);
  // console.log(user);
  nameDiv.innerHTML = user.user_metadata.full_name;
  emailDiv.innerHTML = user.email;
  streetDiv.innerHTML = user.user_metadata.street_address;
  document.querySelector('#streetInput').style.display = 'none';
  cityDiv.innerHTML = user.user_metadata.city;
  document.querySelector('#cityInput').style.display = 'none';
  stateDiv.innerHTML = user.user_metadata.state;
  document.querySelector('#stateInput').style.display = 'none';
  zipDiv.innerHTML = user.user_metadata.zipcode;
  document.querySelector('#zipInput').style.display = 'none';
  document.querySelector('#profileBtn').style.display = 'none';
};
// open function opens the netlify-identity-widget signup/sign-in modal
// const open = () => netlifyIdentity.open();
// save function takes the value of the textarea and saves it in the user_metadata for the logged in user
// const save = async () => {
// const user_metadata = {
//   data: {
//     full_name: textArea.value,
//   },
// };
//const user = await netlifyIdentity.gotrue.currentUser().update(user_metadata);

//   showCurrentInfo(user);
//   // textArea.value = '\n Saved!';
//   textArea.value = format_stringify(user.user_metadata);
// };

// Adding an event listener on the netlify identity widget to show the current users data
netlifyIdentity.on('login', (user) => {
  showCurrentInfo(user);
});

// if (user.user_metadata.full_name) {
//   textArea.value = format_stringify(
//     user.user_metadata.full_name
//   ).replace(/"/g, '');
// }
// testing sending jwt in auth header
// Example POST method implementation:
//async function postData(url = '', data = {}) {
// Default options are marked with *
//   const response = fetch({
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + user.token.access_token,
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify(), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// });
// });

// adding some event listeners.
// document.querySelector('#open').addEventListener('click', open);

const updateProfile = async (event) => {
  event.preventDefault();
  let streetVal = document.querySelector('#streetInput').value;
  document.querySelector('#streetDiv').innerHTML = streetVal;
  document.querySelector('#streetInput').style.display = 'none';
  let cityVal = document.querySelector('#cityInput').value;
  document.querySelector('#cityDiv').innerHTML = cityVal;
  document.querySelector('#cityInput').style.display = 'none';
  let stateVal = document.querySelector('#stateInput').value;
  document.querySelector('#stateDiv').innerHTML = stateVal;
  document.querySelector('#stateInput').style.display = 'none';
  let zipVal = document.querySelector('#zipInput').value;
  document.querySelector('#zipDiv').innerHTML = zipVal;
  document.querySelector('#zipInput').style.display = 'none';
  const user_metadata = {
    data: {
      street_address: document.querySelector('#streetDiv').innerHTML,
      city: document.querySelector('#cityDiv').innerHTML,
      state: document.querySelector('#stateDiv').innerHTML,
      zipcode: document.querySelector('#zipDiv').innerHTML,
    },
  };
  const user = await netlifyIdentity.gotrue.currentUser().update(user_metadata);
  console.log(user);
};
document.querySelector('#profileBtn').addEventListener('click', updateProfile);

const redirectUserOnLogout = () => {
  window.location.replace('login.html');
  netlifyIdentity.close();
};

netlifyIdentity.on('logout', redirectUserOnLogout);
