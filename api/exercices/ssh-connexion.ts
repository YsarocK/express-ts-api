import { session, ssh } from '../utils/ssh'

export default async function(host: string, username: string) {
  return session(host, username)
    .then(() => {
      return ssh.execCommand('ls -l')
    })
    .catch((err) => {
      return err
    })
}