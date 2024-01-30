import { UserDoesNotExistsError } from './../../error/user/user-does-not-exists-error'
import { TokenAlredyExistsError } from './../../error/recoverpassword/tokenAlredyExistsError'
import { makeRecoverpassword } from '@/models/recoverpassword/factories/make-recoverpassword'
import { FastifyReply, FastifyRequest } from 'fastify'
import { string, z } from 'zod'
import { makeSendEmailRegister } from '@/service/factories/make-send-email'
export async function registerRecoverpassword(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const makeRecoverPassword = makeRecoverpassword()

  const registerBodySchema = z.object({
    email: string().email(),
  })

  const { email } = registerBodySchema.parse(req.body)
  const theMakeSendEmailRegister = makeSendEmailRegister()
  try {
    const recoverPassword = await makeRecoverPassword.execute(email)
    res.status(201).send({
      message: 'Token created successfully.',
    })
    await theMakeSendEmailRegister.envNodemailler({
      from: 'arlan.carloz@gmail.com',
      to: recoverPassword.recoverpassword.email,
      subject: 'Token created successfully!',
      text: 'HELLO',
      html: `<h1>${recoverPassword.recoverpassword.token}</h1>`,
    })
  } catch (error) {
    if (
      error instanceof UserDoesNotExistsError ||
      error instanceof TokenAlredyExistsError
    ) {
      res.status(409).send({
        message: error.message,
      })
    }
    return res.status(500).send()
  }
}
