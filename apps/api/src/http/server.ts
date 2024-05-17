import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { authenticateWithPassword } from './routes/authenticate-with-password';
import { createAccount } from './routes/create-account';
import { getProfile } from './routes/get-profile';

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyJwt, {
  secret: 'my-secret',
})
app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next,js Saas',
      description: 'Full Stack application with multi-tenant Next.js, Fastify, Prisma, and PostgreSQL',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
  // swagger: {
  //   url: '/openapi.json',
  // },
  // config: {
  //   deepLinking: true,
  //   docExpansion: 'none',
  // },
});
app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server is running on port 3333')
})
