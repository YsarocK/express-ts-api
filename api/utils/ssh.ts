import { NodeSSH } from 'node-ssh'
import { resolve } from 'path'

const ssh = new NodeSSH()
const session = async (host: string, username: string) => {
  return await ssh.connect({
    host: host,
    username: username,
    privateKeyPath: resolve('./id_admin')
  })
}

export { ssh, session }