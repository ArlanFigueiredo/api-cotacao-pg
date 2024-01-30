import { TokenInvalidError } from './../../error/recoverpassword/tokenInvalidError'
import { UserDoesNotExistsError } from './../../error/user/user-does-not-exists-error'

import { FastifyRequest, FastifyReply } from 'fastify'
import { string, z } from 'zod'
import { hash } from 'bcrypt'
import { makeUpdatePassword } from '@/models/user/factories/make-update-password'
export async function updatePassword(req: FastifyRequest, res: FastifyReply) {
  const theMakeUpdatePassword = makeUpdatePassword()

  const updateParamsSchema = z.object({
    id: string(),
    token: string(),
  })

  const updateBodySchema = z.object({
    password: string().min(6),
  })
  const { id, token } = updateParamsSchema.parse(req.params)
  const { password } = updateBodySchema.parse(req.body)

  const password_hash = await hash(password, 8)

  try {
    await theMakeUpdatePassword.execute({
      id,
      token,
      password: password_hash,
    })
    res.status(201).send({
      message: 'Updated password successfully!',
    })
  } catch (error) {
    if (
      error instanceof UserDoesNotExistsError ||
      error instanceof TokenInvalidError
    ) {
      res.status(409).send({
        message: error.message,
      })
    }
  }
  return res.status(500).send()
}
