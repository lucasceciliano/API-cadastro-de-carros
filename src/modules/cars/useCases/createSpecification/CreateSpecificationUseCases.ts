import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string
    description: string
}


class CreateSpecificationUseCases {
    constructor(private specificationsRepository: ISpecificationRepository) {

    }
    execute({name, description}: IRequest): void {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name)

        if(specificationAlreadyExists) {
            throw new Error("especificação já existente")
        }

        this.specificationsRepository.create({
            name,
            description
        })
    }
}

export { CreateSpecificationUseCases }