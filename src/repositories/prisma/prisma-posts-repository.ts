import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PostsRepository, PostUpdateInput } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository {
    async findByUserId(userId: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                userId
            }
        })
        return posts
    }
    async findAll(): Promise<Post[]> {
            const posts = await prisma.post.findMany()
            return posts
        }
    async update(id: string, data: PostUpdateInput): Promise<Post | null> {
        const post = await prisma.post.update({
            where: {
                id
            },
            data: {
                title: data.title,
                content: data.content
            }
        })
        return post
    }
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