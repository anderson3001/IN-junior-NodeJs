import { Prisma } from "@prisma/client";
import { prisma } from "../../http/lib/prisma";
import { PostsRepository } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository {
    async create(data: Prisma.PostUncheckedCreateInput) {
        const posts = await prisma.post.create({
            data
        }) 
        return posts
    }
}