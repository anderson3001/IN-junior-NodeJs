import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import { z } from "zod"

export const app = fastify()
const prisma = new PrismaClient()

app.post('/', async (request, reply) => {//criando usuario
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })

    return reply.status(201).send("Usuário criado com sucesso!")
})