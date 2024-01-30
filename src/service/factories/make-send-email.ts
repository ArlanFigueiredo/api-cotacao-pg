import { EnvNodemailler } from '../send-email-generic'
export function makeSendEmailRegister() {
  const envNodemailler = new EnvNodemailler()
  return envNodemailler
}
