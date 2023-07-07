import { NodeSSH } from 'node-ssh';
import { resolve } from 'path';

export const ssh = new NodeSSH();

export const session = async (host: string, username: string) => {
  return await ssh.connect({
    host: host,
    username: username,
    privateKeyPath: resolve(`./${process.env.SSH_PRIVATE_KEY_NAME}`),
  });
};
