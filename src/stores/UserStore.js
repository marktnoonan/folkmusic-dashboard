  const UserStore = {
  state: {
      username: "no user is set",
    },
    set(prop, payload) {
      this.state[prop] = payload
    }
}

export default UserStore
