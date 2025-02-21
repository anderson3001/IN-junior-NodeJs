import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error"
import { UpdateUserUseCase } from "../../../use-cases/update-user-use-case"
import { title } from "process"
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository"
import { UpdatePostUseCase } from "../../../use-cases/update-post-use-case"

export async function update(request: FastifyRequest,reply: FastifyReply) {
    const updateParamsSchema = z.object({
        postId: z.string().uuid()
    })

    const updateBodySchema = z.object({
        title: z.string().optional(),
        content: z.string().optional()
    })

    const { postId } = updateParamsSchema.parse(request.params)
    const { title, content} = updateBodySchema.parse(request.body)

    try { 
        const prismaPostRepository = new PrismaPostsRepository()
        const updatePostUseCase = new UpdatePostUseCase(prismaPostRepository)
        const post = await updatePostUseCase.execute({
            postId,
            data: { 
                title,
                content
                }
        })

        return reply.status(200).send({ post })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}