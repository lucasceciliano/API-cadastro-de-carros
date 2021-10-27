import { Request, Response } from "express";
import { CreateSpecificationUseCases } from "./CreateSpecificationUseCases";
import { container } from "tsyringe"

class CreateSpecificationController {

    handle(request: Request, response: Response): Response {
        const {name, description} = request.body
    
        const createSpecificationUseCases = container.resolve(
            CreateSpecificationUseCases
        )

        createSpecificationUseCases.execute({name, description})

    return response.status(201).send()
    }
}

export {CreateSpecificationController}