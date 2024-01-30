import { UpdatePasswordUserModel } from './../update-password'
import { PrismaRecoverpasswordRepository } from './../../../repositories/recoverpassword/prisma-recoverpassword-repository'
import { PrismaUserRepository } from './../../../repositories/user/prisma-user-repository'
export function makeUpdatePassword() {
  const userRepository = new PrismaUserRepository()
  const recoverPasswordRepository = new PrismaRecoverpasswordRepository()
  const updatePassworUserdModel = new UpdatePasswordUserModel(
    userRepository,
    recoverPasswordRepository,
  )
  return updatePassworUserdModel
}
