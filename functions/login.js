function created() {
  const self = this;
  // eslint-disable-next-line no-undef
  netlifyIdentity.on('init', (user) => {
    if (user) {
      self.token = user.token.access_token;
      self.listTasks();
      self.isLoggedIn = true;
    }
  });

  // eslint-disable-next-line no-undef
  netlifyIdentity.on('login', (user) => {
    self.token = user.token.access_token;
    self.listTasks();
    self.isLoggedIn = true;
  });

  // eslint-disable-next-line no-undef
  netlifyIdentity.on('logout', () => {
    self.isLoggedIn = false;
    self.newTaskInput = '';
    self.tasks = [];
    self.token = '';
  });
}
