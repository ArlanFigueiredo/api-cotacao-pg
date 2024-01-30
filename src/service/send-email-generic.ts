import { transporter } from './env'

interface EnvEmailNodemailler {
  from: string
  to: string
  subject: string
  text: string
  html: string
}
export class EnvNodemailler {
  async envNodemailler({
    from,
    to,
    subject,
    text,
    html,
  }: EnvEmailNodemailler): Promise<void> {
    await transporter
      .sendMail({
        from,
        to,
        subject,
        text,
        html,
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
