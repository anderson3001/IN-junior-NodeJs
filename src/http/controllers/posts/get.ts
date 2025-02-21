import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "../../../use-cases/register-use-cases"
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { UserAlreadyExists } from "../../../use-cases/errors/user-already-exists-error"
import { GetUserUseCase } from "../../../use-cases/get-user-use-case"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error"
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository"
import { GetPostUseCase } from "../../../use-cases/get-post-use-case"

export async function get(request: FastifyRequest,reply: FastifyReply) {
    const getParamsSchema = z.object({
        postId: z.string().uuid()
    })

    const { postId } = getParamsSchema.parse(request.params)

    try {
        const prismaPostRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetPostUseCase(prismaPostRepository)

        const post = await getPostUseCase.execute({
            postId    
        })

        return reply.status(200).send({ post })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}