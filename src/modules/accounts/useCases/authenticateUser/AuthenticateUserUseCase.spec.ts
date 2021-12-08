import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { CreateUserUseCase } from "../CreateUserUseCase"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        )
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("Should be able to authenticate an  user", async () =>{
        const user: ICreateUserDTO = {
            driver_license:"00123",
            email:"user@test.com",
            password:"1234",
            name:"Usertest"
        }
        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        })

        expect(result).toHaveProperty("token")

        it("should not be able to authenticate an nonexistent user", async () => {
            expect(async () => {
                await authenticateUserUseCase.execute({
                    email: "false@email.com",
                    password: "1234",
                })
            }).rejects.toBeInstanceOf(AppError)
          });

        it("should not be able to authenticate with incorrect password", () => {
            expect(async () => {
                const user: ICreateUserDTO = {
                    driver_license: "9999",
                    email: "user@user.com",
                    password: "1234",
                    name: "UserTestError"
                }

                await createUserUseCase.execute(user)

                await authenticateUserUseCase.execute({
                    email: user.email,
                    password: "incorrectPassword",
                })
            }).rejects.toBeInstanceOf(AppError)
        })
        
    })
})