import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import {AppError} from "../../../../errors/AppError"

interface IRequest {
    name: string
    description: string
}

@injectable()
class CreateSpecificationUseCases {
    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository) {

    }
    async execute({name, description}: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if(specificationAlreadyExists) {
            throw new AppError("especificação já existente")
        }

        await this.specificationsRepository.create({
            name,
            description
        })
    }
}

export { CreateSpecificationUseCases }