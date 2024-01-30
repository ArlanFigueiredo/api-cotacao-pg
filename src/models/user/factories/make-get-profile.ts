import { GetProfileUserModel } from './../get-profile-user'
import { PrismaUserRepository } from './../../../repositories/user/prisma-user-repository'
export function makeGetProfileUser() {
  const userRepository = new PrismaUserRepository()
  const getProfileUserModel = new GetProfileUserModel(userRepository)
  return getProfileUserModel
}
