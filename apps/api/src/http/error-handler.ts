import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { BadRequestError } from './routes/_errors/bad-request-error'
import { Unauthorized } from './routes/_errors/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = async (error, request, reply) => {
  if(error instanceof ZodError) {
    return reply.status(400).send({
      message: 'validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if(error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if(error instanceof Unauthorized) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)
  // send error to some observability tool

  return reply.status(500).send({
    message: 'Internal server error',
  })
}