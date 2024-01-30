import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists-error'
import { UserRepository } from '@/repositories/user/user-repository'
export class GetProfileUserModel {
  constructor(private userRepository: UserRepository) {}

  async findById(id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserDoesNotExistsError()
    }

    return {
      user,
    }
  }
}
