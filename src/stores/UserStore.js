  const UserStore = {
  state: {
      username: '',
    },
    set(prop, payload) {
      this.state[prop] = payload
    }
}

export default UserStore
