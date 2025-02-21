import { User } from "@prisma/client"
import { UsersRepository } from "../repositories/users-repostory"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetUserUseCaseResponse {
    user: User[]
}


export class GetAllUserUseCase{

    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<GetUserUseCaseResponse>{
        const user = await this.usersRepository.findAll()
        
        return { user }
    }
    
    
}