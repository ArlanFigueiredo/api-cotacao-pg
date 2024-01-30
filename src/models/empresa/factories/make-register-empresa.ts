import { PrismaEmpresaRepository } from './../../../repositories/empresa/prisma-empresa-repository'
import { PrismaUserRepository } from './../../../repositories/user/prisma-user-repository'
import { RegisterEmpresaModel } from './../register'
export function makeRegisterEmpresa() {
  const userRepository = new PrismaUserRepository()
  const empresaRepository = new PrismaEmpresaRepository()
  const registerEmpresaModel = new RegisterEmpresaModel(
    empresaRepository,
    userRepository,
  )
  return registerEmpresaModel
}
