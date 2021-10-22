import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCases } from "./CreateSpecificationUseCases";


const specificationRepository = new SpecificationRepository()
const createSpecificationUseCase = new CreateSpecificationUseCases(specificationRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export {createSpecificationController}