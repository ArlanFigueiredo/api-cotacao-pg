import { Prisma, RecoverPassword } from '@prisma/client'
export interface RecoverpasswordRepository {
  updateStateToken(token: string): Promise<RecoverPassword | null>
  checkToken(token: string): Promise<RecoverPassword | null>
  findByEmail(email: string): Promise<RecoverPassword | null>
  create(data: Prisma.RecoverPasswordCreateInput): Promise<RecoverPassword>
}
