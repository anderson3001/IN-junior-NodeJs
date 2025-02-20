import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../../use-cases/authenticate-use-case"

export async function authenticate(request: FastifyRequest,reply: FastifyReply) {//criando usuario
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password } = authenticateBodySchema.parse(request.body)

    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)

        await authenticateUseCase.execute({ 
            email, 
            password})

    } catch (err) {
        return reply.status(401).send()
    }

    return reply.status(200).send("Autenticado com sucesso!")
}