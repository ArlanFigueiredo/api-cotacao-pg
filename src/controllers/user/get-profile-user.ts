import { UserDoesNotExistsError } from '../../error/user/user-does-not-exists-error'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetProfileUser } from '@/models/user/factories/make-get-profile'
export async function profile(req: FastifyRequest, res: FastifyReply) {
  const theMakeGetProfileUser = makeGetProfileUser()

  try {
    const { user } = await theMakeGetProfileUser.findById(req.user.sub)
    return res.status(201).send({
      user: {
        ...user,
        password: undefined,
      },
    })
  } catch (error) {
    if (error instanceof UserDoesNotExistsError) {
      return res.status(404).send({
        message: error.message,
      })
    }
  }
}
