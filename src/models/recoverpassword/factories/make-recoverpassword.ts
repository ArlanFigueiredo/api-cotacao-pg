import { RegisterRecoverPasswordModel } from './../register'
import { PrismaRecoverpasswordRepository } from './../../../repositories/recoverpassword/prisma-recoverpassword-repository'
import { PrismaUserRepository } from './../../../repositories/user/prisma-user-repository'
export function makeRecoverpassword() {
  const userRepository = new PrismaUserRepository()
  const recoverpasswordRepository = new PrismaRecoverpasswordRepository()

  const registerRecoverpasswordModel = new RegisterRecoverPasswordModel(
    userRepository,
    recoverpasswordRepository,
  )

  return registerRecoverpasswordModel
}
