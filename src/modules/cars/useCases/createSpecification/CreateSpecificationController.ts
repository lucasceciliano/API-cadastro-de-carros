import { Request, Response } from "express";
import { CreateSpecificationUseCases } from "./CreateSpecificationUseCases";
import { container } from "tsyringe"

class CreateSpecificationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {name, description} = request.body
    
        const createSpecificationUseCases = container.resolve(
            CreateSpecificationUseCases
        )

        await createSpecificationUseCases.execute({name, description})

    return response.status(201).send()
    }
}

export {CreateSpecificationController}