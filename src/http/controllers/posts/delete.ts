import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error"
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository"
import { DeletePostUseCase } from "../../../use-cases/delete-post-use-case"

export async function deletePost(request: FastifyRequest,reply: FastifyReply) {
    const getParamsSchema = z.object({
        postId: z.string().uuid()
    })

    const { postId } = getParamsSchema.parse(request.params)

    try {
        const prismaPostRepository = new PrismaPostsRepository()
        const deletePostUseCase = new DeletePostUseCase(prismaPostRepository)

        const post = await deletePostUseCase.execute({
            postId    
        })

        return reply.status(204).send({ post })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}