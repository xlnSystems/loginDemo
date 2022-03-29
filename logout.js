const redirectUserOnLogout = () => {
  window.location.replace('login.html');
  netlifyIdentity.close();
};

netlifyIdentity.on('logout', redirectUserOnLogout);
