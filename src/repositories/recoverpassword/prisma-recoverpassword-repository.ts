import { prisma } from './../../lib/prisma'
import { Prisma, RecoverPassword } from '@prisma/client'
import { RecoverpasswordRepository } from './recoverpassword-repository'
export class PrismaRecoverpasswordRepository
  implements RecoverpasswordRepository
{
  async updateStateToken(token: string): Promise<RecoverPassword | null> {
    const tokenState = await prisma.recoverPassword.update({
      where: {
        token,
      },
      data: {
        token,
        used: 1,
      },
    })
    return tokenState
  }

  async checkToken(token: string): Promise<RecoverPassword | null> {
    const tokenCheck = await prisma.recoverPassword.findUnique({
      where: {
        token,
        used: 0,
      },
    })
    return tokenCheck
  }

  async findByEmail(email: string): Promise<RecoverPassword | null> {
    const recoverpassword = await prisma.recoverPassword.findFirst({
      where: {
        email,
        used: 0,
      },
    })

    return recoverpassword
  }

  async create(
    data: Prisma.RecoverPasswordCreateInput,
  ): Promise<RecoverPassword> {
    const recoverpassword = await prisma.recoverPassword.create({
      data,
    })
    return recoverpassword
  }
}
