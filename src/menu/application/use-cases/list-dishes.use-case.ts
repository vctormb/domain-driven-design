import { DishRepository } from "../../domain/repositories/dish.repository";
import { DishMapper } from "../mappers/dish.mapper";

export class ListDishesUseCase {
  constructor(private readonly dishRepository: DishRepository) {}

  async execute() {
    const dishes = await this.dishRepository.findAll();
    return dishes.map((dish) => DishMapper.toDTO(dish));
  }
}
