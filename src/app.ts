import fastify from "fastify"
import { z } from "zod"
import {userRoutes } from "./http/controllers/users/routes"
import { postsRoutes } from "./http/controllers/posts/routes"

export const app = fastify()

app.register(userRoutes)
app.register(postsRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof z.ZodError) {
        return reply.status(400).send({message: 'Validation error', issues: error.format()})
    }
    return reply.status(500).send({message: 'Internal server error'})
})