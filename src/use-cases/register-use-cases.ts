import { hash } from "bcryptjs"
import { prisma } from "../http/lib/prisma"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string   
}

export class RegisterUseCase{

    constructor(private usersRepository: any) {}

    async execute({name, email, password}: RegisterUseCaseRequest){
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
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