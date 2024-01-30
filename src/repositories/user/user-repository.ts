import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  updatePassword(id: string, password: string): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
