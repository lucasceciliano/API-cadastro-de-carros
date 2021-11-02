import { inject, injectable } from "tsyringe";
import { IUsersRepository} from "../../repositories/IUsersRepository"
import {sign} from "jsonwebtoken"
import { compare } from "bcrypt"
import {AppError} from "../../../../errors/AppError"

interface IRequest {
 email: string
 password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    }

    token: string
}


@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute({email, password}: IRequest): Promise<IResponse> {
        //Usuario exite
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError("Email or password incorrect!", 401)
        }

        //senha correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!", 401)
        }

        //gerar jsontoken
        const token = sign({}, "3e44cae1aa332b5813823f09f7c85bd8", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn
        
    }
}

export {AuthenticateUserUseCase}