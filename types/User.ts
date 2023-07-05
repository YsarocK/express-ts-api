interface User {
  email:  string,
  ssh: {
    host: string
  },
  steps: Array<boolean>
}

export default User