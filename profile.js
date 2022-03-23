// Let's find these DOM elements!
const nameDiv = document.querySelector('#nameDiv');
const emailDiv = document.querySelector('#emailDiv');
const passDiv = document.querySelector('#passDiv');
const streetDiv = document.querySelector('#streetDiv');
const cityDiv = document.querySelector('#cityDiv');
const stateDiv = document.querySelector('#stateDiv');
const zipDiv = document.querySelector('#zipDiv');

// format_stringify is a function that takes in an object and returns formatted JSON
const format_stringify = (data) => JSON.stringify(data, null, 2);
// showCurrentInfo updates the UI to show the current user data passed in to it
const showCurrentInfo = (user) => {
  const str = format_stringify(user);
  console.log(str);
  nameDiv.innerHTML = user.user_metadata.full_name;
  emailDiv.innerHTML = user.email;
  passDiv.innerHTML = '************';
};

const toggleNameEdit = () => {
  let nameInput = document.querySelector('#nameInput');
  if (nameInput.style.display === 'none') {
    nameInput.style.display = 'block';
  } else {
    nameInput.style.display = 'none';
  }
};

const updateName = async () => {
  let nameVal = document.querySelector('#nameInput').value;
  document.querySelector('#nameDiv').innerHTML = nameVal;
  const user_metadata = {
    data: {
      full_name: document.querySelector('#nameDiv').innerHTML,
    },
  };
  const userName = await netlifyIdentity.gotrue
    .currentUser()
    .update(user_metadata);
  nameInput.style.display = 'none';
};

let nameInput = document.querySelector('#nameInput');
nameInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateName(e);
  }
});

const toggleStreetEdit = () => {
  let streetInput = document.querySelector('#streetInput');
  if (streetInput.style.display === 'none') {
    streetInput.style.display = 'block';
  } else {
    streetInput.style.display = 'none';
  }
};

const updateStreet = async () => {
  let streetVal = document.querySelector('#streetInput').value;
  document.querySelector('#streetDiv').innerHTML = streetVal;
  const user_metadata = {
    data: {
      street_address: document.querySelector('#streetDiv').innerHTML,
    },
  };
  const userStreet = await netlifyIdentity.gotrue
    .currentUser()
    .update(user_metadata);
  streetInput.style.display = 'none';
};

let streetInput = document.querySelector('#streetInput');
streetInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateStreet(e);
  }
});

const toggleCityEdit = () => {
  let cityInput = document.querySelector('#cityInput');
  if (cityInput.style.display === 'none') {
    cityInput.style.display = 'block';
  } else {
    cityInput.style.display = 'none';
  }
};

const updateCity = async () => {
  let cityVal = document.querySelector('#cityInput').value;
  document.querySelector('#cityDiv').innerHTML = cityVal;
  const user_metadata = {
    data: {
      city: document.querySelector('#cityDiv').innerHTML,
    },
  };
  const userCity = await netlifyIdentity.gotrue
    .currentUser()
    .update(user_metadata);
  cityInput.style.display = 'none';
};

let cityInput = document.querySelector('#cityInput');
cityInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateCity(e);
  }
});

const toggleStateEdit = () => {
  let stateInput = document.querySelector('#stateInput');
  if (stateInput.style.display === 'none') {
    stateInput.style.display = 'block';
  } else {
    stateInput.style.display = 'none';
  }
};

const updateState = async () => {
  let stateVal = document.querySelector('#stateInput').value;
  document.querySelector('#stateDiv').innerHTML = stateVal;
  const user_metadata = {
    data: {
      state: document.querySelector('#stateDiv').innerHTML,
    },
  };
  const userState = await netlifyIdentity.gotrue
    .currentUser()
    .update(user_metadata);
  stateInput.style.display = 'none';
};

const toggleZipEdit = () => {
  let zipInput = document.querySelector('#zipInput');
  if (zipInput.style.display === 'none') {
    zipInput.style.display = 'block';
  } else {
    zipInput.style.display = 'none';
  }
};

const updateZip = async () => {
  let zipVal = document.querySelector('#zipInput').value;
  document.querySelector('#zipDiv').innerHTML = zipVal;
  const user_metadata = {
    data: {
      zipcode: document.querySelector('#zipDiv').innerHTML,
    },
  };
  const userZip = await netlifyIdentity.gotrue
    .currentUser()
    .update(user_metadata);
  zipInput.style.display = 'none';
};

let zipInput = document.querySelector('#zipInput');
zipInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateZip(e);
  }
});

// Adding an event listener on the netlify identity widget to show the current users data
netlifyIdentity.on('login', (user) => {
  showCurrentInfo(user);
  if (user.user_metadata.street_address) {
    streetDiv.innerHTML = format_stringify(
      user.user_metadata.street_address
    ).replace(/"/g, '');
  }
  if (user.user_metadata.city) {
    cityDiv.innerHTML = format_stringify(user.user_metadata.city).replace(
      /"/g,
      ''
    );
  }
  if (user.user_metadata.state) {
    stateDiv.innerHTML = format_stringify(user.user_metadata.state).replace(
      /"/g,
      ''
    );
  }
  if (user.user_metadata.zipcode) {
    zipDiv.innerHTML = format_stringify(user.user_metadata.zipcode).replace(
      /"/g,
      ''
    );
  }
});

// testing sending jwt in auth header
// Example POST method implementation:
async function postData(url = '', data = {}) {
  const response = fetch({
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token.access_token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const redirectUserOnLogout = () => {
  window.location.replace('login.html');
  netlifyIdentity.close();
};

netlifyIdentity.on('logout', redirectUserOnLogout);

let messageBox = document.getElementById('passMessage');
const showMessage = () => {
  messageBox.style.display = 'block';
};

const closeMessage = () => {
  messageBox.style.display = 'none';
};
