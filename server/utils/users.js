class Users {
  constructor () {
    this.users = [];
  }

  // addUser (id, name, room)
  addUser (id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  // removeUser (id)
  removeUser (id) {
    const removedUser = this.users.filter((user) => user.id === id)[0];

    if (removedUser) {
      this.users = this.users.filter((user) => user.id != id);
    }

    return removedUser;
  }

  // getUser (id)
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  // getUserList (room)
  getUserList (room) {
    const users = this.users.filter((user) => user.room === room);
    const namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};