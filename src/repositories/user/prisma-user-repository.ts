import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from './user-repository'
export class PrismaUserRepository implements UserRepository {
  async updatePassword(id: string, password: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    })
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
