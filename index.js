// import { GET } from '../../netlify';
// const data = await GET(`/getData`);

// function getUserRoles(context) {
//   const { clientContext } = context;
//   const userRoles = clientContext.user
//     ? clientContext.user.app_metadata.roles
//     : ['guest'];
// }

// export async function handle(event, context) {
//   const userRoles = getUserRoles(context);
//   console.log(userRoles);

//   // Return with 401 if user is not logged in
//   if (userRoles.includes('guest')) {
//     return {
//       statusCode: 401,
//       body: 'unauthorized',
//     };
//   }

//   let data;

//   // Get data only admins should see
//   if (userRoles.includes('admin')) {
//     data = getAllStatuses();
//   }

//   // Get data only owners should see
//   else if (userRoles.includes('owner')) {
//     data = getStatus();
//   }

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       data,
//     }),
//   };
// }

// type = 'text/javascript';
// src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';

// const button1 = document.getElementById('left');
// const button2 = document.getElementById('right');

// const login = () => netlifyIdentity.open('login');
// const signup = () => netlifyIdentity.open('signup');

// // by default, add login and signup functionality
// button1.addEventListener('click', login);
// button2.addEventListener('click', signup);

// const updateUserInfo = (user) => {
//   const container = document.querySelector('.user-info');

//   // cloning the buttons removes existing event listeners
//   const b1 = button1.cloneNode(true);
//   const b2 = button2.cloneNode(true);

//   // empty the user info div
//   container.innerHTML = '';

//   if (user) {
//     b1.innerText = 'Log Out';
//     b1.addEventListener('click', () => {
//       netlifyIdentity.logout();
//     });

//     b2.innerText = 'Manage Account';
//     b2.addEventListener('click', () => {
//       // TODO handle subscription management
//     });
//   } else {
//     // if no one is logged in, show login/signup options
//     b1.innerText = 'Log In';
//     b1.addEventListener('click', login);

//     b2.innerText = 'Sign Up';
//     b2.addEventListener('click', signup);
//   }

//   // add the updated buttons back to the user info div
//   container.appendChild(b1);
//   container.appendChild(b2);
// };

const redirectUser = () => {
  window.location.replace('sasa.html');
  netlifyIdentity.close();
};

// netlifyIdentity.on('init', handleUserStateChange);
netlifyIdentity.on('login', redirectUser);
// netlifyIdentity.on('logout', handleUserStateChange);
