import { AuthenticateUserModel } from '../authenticate'
import { PrismaUserRepository } from './../../../repositories/user/prisma-user-repository'
export function makeAuthenticate() {
  const userRepository = new PrismaUserRepository()
  const authenticateUserModel = new AuthenticateUserModel(userRepository)

  return authenticateUserModel
}
