import { Post, Prisma} from "@prisma/client";

export interface PostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findById(postId: string): Promise<Post | null>
}