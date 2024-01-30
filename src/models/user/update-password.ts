import { User } from '@prisma/client'
import { TokenInvalidError } from './../../error/recoverpassword/tokenInvalidError'
import { UserDoesNotExistsError } from './../../error/user/user-does-not-exists-error'
import { PrismaRecoverpasswordRepository } from './../../repositories/recoverpassword/prisma-recoverpassword-repository'
import { PrismaUserRepository } from './../../repositories/user/prisma-user-repository'

interface UpdatePasswordUserModelRequest {
  id: string
  token: string
  password: string
}

interface UpdatePasswordUserModelResponse {
  userResult: User
}

export class UpdatePasswordUserModel {
  constructor(
    private userRepository = new PrismaUserRepository(),
    private recoverPasswordRepository = new PrismaRecoverpasswordRepository(),
  ) {}

  async execute({
    id,
    token,
    password,
  }: UpdatePasswordUserModelRequest): Promise<UpdatePasswordUserModelResponse> {
    const user = await this.userRepository.findById(id)
    const recoverPassword =
      await this.recoverPasswordRepository.checkToken(token)
    const userResult = await this.userRepository.updatePassword(id, password)
    if (!user) {
      throw new UserDoesNotExistsError()
    }

    if (!recoverPassword) {
      throw new TokenInvalidError()
    }

    if (userResult) {
      await this.recoverPasswordRepository.updateStateToken(token)
    }

    return {
      userResult,
    }
  }
}
