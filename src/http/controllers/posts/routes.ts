import { FastifyInstance } from "fastify";
import { create } from "./create";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)
}