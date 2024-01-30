import { EmpresaAlredyExistsError } from '@/error/empresa/empresa-alredy-exists-error'
import { makeRegisterEmpresa } from '@/models/empresa/factories/make-register-empresa'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
export async function registerCompany(req: FastifyRequest, res: FastifyReply) {
  const makeUserModelRegister = makeRegisterEmpresa()
  const registerBodySchema = z.object({
    reason_social: z.string(),
    cnpj: z.string(),
    zip_code: z.number().min(8),
    road: z.string(),
    neighborhood: z.string(),
    number: z.number(),
    city: z.string(),
    state: z.string(),
    city_work: z.string(),
    responsible: z.string(),
    contact: z.string(),
  })

  const registerBodySchemaUserId = z.object({
    userId: z.string(),
  })

  const { userId } = registerBodySchemaUserId.parse(req.params)

  const {
    reason_social,
    cnpj,
    zip_code,
    road,
    neighborhood,
    number,
    city,
    state,
    city_work,
    responsible,
    contact,
  } = registerBodySchema.parse(req.body)

  try {
    await makeUserModelRegister.create({
      userId,
      reason_social,
      cnpj,
      zip_code,
      road,
      neighborhood,
      number,
      city,
      state,
      city_work,
      responsible,
      contact,
    })
    return res.status(201).send({
      message: 'Created company successfully.',
    })
  } catch (error) {
    if (error instanceof EmpresaAlredyExistsError) {
      return res.status(409).send({
        message: error.message,
      })
    }
  }
}
