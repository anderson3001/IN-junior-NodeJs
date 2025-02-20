import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repostory"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string   
}

export class RegisterUseCase{

    constructor(private usersRepository: UsersRepository) {}

    async execute({name, email, password}: RegisterUseCaseRequest){
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if (userWithSameEmail) {
            throw new Error()
        }
    
        const passwordHash = await hash(password, 6)
    
        await this.usersRepository.create({
            name,
            email,
            password: passwordHash
        })
    }

    
    
}