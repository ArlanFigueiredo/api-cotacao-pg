import { FastifyInstance } from 'fastify'
import { register } from '@/controllers/user/register'
import { registerCompany } from '@/controllers/empresa/register'
import { registerService } from '@/controllers/servico/register'
import { authenticate } from '@/controllers/user/authenticate'
import { profile } from '@/controllers/user/get-profile-user'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { registerRecoverpassword } from '@/controllers/recoverpassword/register'
import { updatePassword } from '@/controllers/user/update-password'
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/authenticate', authenticate)

  app.post('/company/:userId', registerCompany)

  app.post('/service/:empresaId', registerService)

  app.get('/me', { onRequest: [verifyJWT] }, profile)

  app.post('/recoverpassword', registerRecoverpassword)

  app.post('/updatepassword/:id/:token', updatePassword)
}
