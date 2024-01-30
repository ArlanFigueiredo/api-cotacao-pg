import { UserAlredyExistsError } from '@/error/user/user-alredy-exist-error'
import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcrypt'
import { makeRegisterUser } from '@/models/user/factories/make-register'
import { makeSendEmailRegister } from '@/service/factories/make-send-email'
export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.coerce.string(),
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)
  const theMakeRegisterUser = makeRegisterUser()
  const theMakeSendEmailRegister = makeSendEmailRegister()
  const password_hash = await hash(password, 8)
  try {
    const user = await theMakeRegisterUser.create({
      name,
      email,
      password: password_hash,
    })
    await theMakeSendEmailRegister.envNodemailler({
      from: 'arlan.carloz@gmail.com',
      to: user.user.email,
      subject: 'User created successfully!',
      text: 'Agora você faz parte do nosso time!',
      html: '<h1>Obrigado por se inscrever</h1>',
    })
    return res.status(201).send({
      message: 'Created successfully',
      user,
    })
  } catch (error) {
    if (error instanceof UserAlredyExistsError) {
      res.status(409).send({
        message: error.message,
      })
    }
  }
}
