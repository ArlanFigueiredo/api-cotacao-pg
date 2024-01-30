import { InvalidCredentialsError } from '../../error/user/inalid-credentials-error'
import { PrismaUserRepository } from '@/repositories/user/prisma-user-repository'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'
interface AuthenticateUserModelRequest {
  email: string
  password: string
}

interface AuthenticateUserModelResponse {
  user: User
}

export class AuthenticateUserModel {
  constructor(private userRepository: PrismaUserRepository) {}

  async authentication({
    email,
    password,
  }: AuthenticateUserModelRequest): Promise<AuthenticateUserModelResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPassWordMatches = await compare(password, user.password)
    if (!doesPassWordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
