import { Prisma, User} from "@prisma/client";
import { prisma } from "../../http/lib/prisma";
import { UsersRepository } from "../users-repostory";

export class PrismaUsersRepository implements UsersRepository {
    async delete(id: string): Promise<User | null> {
        const posts = await prisma.post.deleteMany({//pra deletar os posts antes de deletar o usuario
            where: {
                userId: id
            }
        })
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return user 
    }
    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user 
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user 
    }
}