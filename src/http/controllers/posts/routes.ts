import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";
import { deletePost } from "./delete";
import { update } from "./update";
import { getAll } from "./get-all";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts/:postId', get)
    app.get('/posts', getAll)

    app.delete('/posts/:postId', deletePost)

    app.patch('/posts/:postId', update)
}