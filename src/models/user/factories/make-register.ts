import { RegisterUserModel } from '../register'
import { PrismaUserRepository } from './../../../repositories/user/prisma-user-repository'
export function makeRegisterUser() {
  const userRepository = new PrismaUserRepository()
  const registerUserModel = new RegisterUserModel(userRepository)
  return registerUserModel
}
