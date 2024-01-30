import { TokenAlredyExistsError } from './../../error/recoverpassword/tokenAlredyExistsError'
import { UserDoesNotExistsError } from './../../error/user/user-does-not-exists-error'
import { RecoverPassword } from '@prisma/client'
import { RecoverpasswordRepository } from './../../repositories/recoverpassword/recoverpassword-repository'
import { UserRepository } from './../../repositories/user/user-repository'

interface RegisterRecoverpasswordModelResponse {
  recoverpassword: RecoverPassword
}

export class RegisterRecoverPasswordModel {
  constructor(
    private userRepository: UserRepository,
    private recoverpasswordRepository: RecoverpasswordRepository,
  ) {}

  async execute(email: string): Promise<RegisterRecoverpasswordModelResponse> {
    const user = await this.userRepository.findByEmail(email)
    const recoverpasswordExists =
      await this.recoverpasswordRepository.findByEmail(email)

    if (!user) {
      throw new UserDoesNotExistsError()
    }

    if (recoverpasswordExists) {
      throw new TokenAlredyExistsError()
    }

    const recoverpassword = await this.recoverpasswordRepository.create({
      email,
    })

    return {
      recoverpassword,
    }
  }
}
