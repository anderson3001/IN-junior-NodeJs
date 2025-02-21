import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../../../use-cases/authenticate-use-case"

export async function refresh(request: FastifyRequest,reply: FastifyReply) {//criando usuario

    await request.jwtVerify({ onlyCookie: true })

    const token = await reply.jwtSign({},{
        sign: {
            sub: request.user.sub
        }
    })
    const refreshToken = await reply.jwtSign({},{
        sign: {
            sub: request.user.sub,
            expiresIn: "7d"
        }
    })

    return reply.status(200)
    .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
    })
    .send({ token })


}
