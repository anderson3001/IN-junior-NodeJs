import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../http/lib/prisma";
import { PostsRepository } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository {
    async delete(id: string): Promise<Post | null> {
            const post = await prisma.post.delete({
                where: {
                    id
                }
            })
            return post 
        }
    async findById(id: string){
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })
        return post 
    }
    async create(data: Prisma.PostUncheckedCreateInput) {
        const posts = await prisma.post.create({
            data
        }) 
        return posts
    }
}