import { InvalidCredentialsError } from './../../error/user/inalid-credentials-error'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAuthenticate } from '@/models/user/factories/make-authenticate'
export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const theMakeAuthenticate = makeAuthenticate()

  const authenticateBodySchema = z.object({
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const { user } = await theMakeAuthenticate.authentication({
      email,
      password,
    })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return res.status(201).send({
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(409).send({
        message: error.message,
      })
    }
  }
}
