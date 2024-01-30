import { RegisterServicoModel } from '@/models/servico/register'
import { PrismaServicoRepository } from './../../../repositories/servico/prisma-servico-repository'
import { PrismaEmpresaRepository } from '@/repositories/empresa/prisma-empresa-repository'
export function makeRegisterServico() {
  const empresaRepository = new PrismaEmpresaRepository()
  const servicoRepository = new PrismaServicoRepository()
  const registerServicoModel = new RegisterServicoModel(
    empresaRepository,
    servicoRepository,
  )
  return registerServicoModel
}
