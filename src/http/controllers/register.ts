import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function register(request: FastifyRequest,reply: FastifyReply) {//criando usuario
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        return reply.status(409).send("Já existe um usuário com esse email.")
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })

    return reply.status(201).send("Usuário criado com sucesso!")
}