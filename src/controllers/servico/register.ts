import { EmpresaDoesNotExistsError } from '@/error/empresa/empresa-does-not-exists-error'
import { makeRegisterServico } from '@/models/servico/factories/make-register-servico'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerService(req: FastifyRequest, res: FastifyReply) {
  const registerEmpresaIdSchema = z.object({
    empresaId: z.string(),
  })

  const registerBodySchema = z.object({
    service_type: z.string(),
    unit: z.string(),
    unit_price: z.coerce.number(),
    amount: z.coerce.number(),
    total_price: z.coerce.number(),
  })

  const { empresaId } = registerEmpresaIdSchema.parse(req.params)
  const { service_type, unit, unit_price, amount, total_price } =
    registerBodySchema.parse(req.body)

  const theMakeRegisterServico = makeRegisterServico()
  try {
    const company = await theMakeRegisterServico.execute({
      empresaId,
      service_type,
      unit,
      amount,
      unit_price,
      total_price,
    })
    return res.status(201).send({
      message: 'Created service successfully',
      company,
    })
  } catch (error) {
    if (error instanceof EmpresaDoesNotExistsError) {
      return res.status(409).send({
        message: error.message,
      })
    }
  }
}
