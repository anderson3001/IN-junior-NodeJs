import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExists } from "../../../use-cases/errors/user-already-exists-error"
import { CreatePostUseCase } from "../../../use-cases/create-post-use-case"
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository"

export async function create(request: FastifyRequest,reply: FastifyReply) {
    const createBodySchema = z.object({
        title: z.string(),
        content: z.string(),
        userId: z.string().uuid(),

    })

    const { title, content, userId } = createBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository)

        await createPostUseCase.execute({
            title,
            content,
            userId
        })

    } catch (err) {
        throw err
    }

    return reply.status(201).send("Post criado com sucesso!")
}