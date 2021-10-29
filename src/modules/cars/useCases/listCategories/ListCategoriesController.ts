import { Request, Response } from "express";
import {ListCategoriesUseCases} from "./ListCategoriesUseCases"
import { container } from "tsyringe"

class ListCategoriesController {
    

    async handle(request: Request, response: Response): Promise<Response> {

        const listCategoriesUseCases = container.resolve(ListCategoriesUseCases)
        const all = await listCategoriesUseCases.execute()

        return response.json(all)
    }
}

export {ListCategoriesController}