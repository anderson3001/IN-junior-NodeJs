import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "../../use-cases/register-use-cases"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"

export async function register(request: FastifyRequest,reply: FastifyReply) {//criando usuario
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUserRepository)

        await registerUseCase.execute({name, 
            email, 
            password})

    } catch (err) {
        return reply.status(409).send("Usuário já existe!")
    }

    return reply.status(201).send("Usuário criado com sucesso!")
}