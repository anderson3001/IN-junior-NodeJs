import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts/:postId', get)
}