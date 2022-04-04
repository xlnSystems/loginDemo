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
  nameDiv.innerHTML = user.user_metadata.full_name;
  emailDiv.innerHTML = user.email;
  passDiv.innerHTML = '********';
};
let nameBox = document.querySelector('#nameContainer');
const openNameEdit = () => {
  nameBox.style.display = 'block';
};
const closeNameEdit = () => {
  nameBox.style.display = 'none';
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
  nameBox.style.display = 'none';
  nameInput.value = '';
};

let nameInput = document.querySelector('#nameInput');
nameInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateName(e);
  }
});

let streetBox = document.querySelector('#streetContainer');
const openStreetEdit = () => {
  streetBox.style.display = 'block';
};
const closeStreetEdit = () => {
  streetBox.style.display = 'none';
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
  streetBox.style.display = 'none';
  streetInput.value = '';
};

let streetInput = document.querySelector('#streetInput');
streetInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateStreet(e);
  }
});

let cityBox = document.querySelector('#cityContainer');
const openCityEdit = () => {
  cityBox.style.display = 'block';
};
const closeCityEdit = () => {
  cityBox.style.display = 'none';
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
  cityBox.style.display = 'none';
  cityInput.value = '';
};

let cityInput = document.querySelector('#cityInput');
cityInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateCity(e);
  }
});

let stateBox = document.querySelector('#stateContainer');
const openStateEdit = () => {
  stateBox.style.display = 'block';
};
const closeStateEdit = () => {
  stateBox.style.display = 'none';
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
  stateBox.style.display = 'none';
  stateInput.value = '';
};

let zipBox = document.querySelector('#zipContainer');
const openZipEdit = () => {
  zipBox.style.display = 'block';
};
const closeZipEdit = () => {
  zipBox.style.display = 'none';
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
  zipBox.style.display = 'none';
  zipInput.value = '';
};

let zipInput = document.querySelector('#zipInput');
zipInput.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    //checks whether the pressed key is "Enter"
    updateZip(e);
  }
});

let passBox = document.querySelector('#passContainer');
const openPassEdit = () => {
  passBox.style.display = 'block';
};
const closePassEdit = () => {
  passBox.style.display = 'none';
};

let emailBox = document.querySelector('#emailContainer');
const openEmailEdit = () => {
  emailBox.style.display = 'block';
};
const closeEmailEdit = () => {
  emailBox.style.display = 'none';
};

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

const closePassMessage = () => {
  document.getElementById('passMessage').style.display = 'none';
};
const closeEmailMessage = () => {
  document.getElementById('emailMessage').style.display = 'none';
};
