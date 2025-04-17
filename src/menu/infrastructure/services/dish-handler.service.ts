import { DishRepository } from "../../domain/repositories/dish.repository";
import { DishMapper } from "../../application/mappers/dish.mapper";

export class DishServiceHandler {
  constructor(private readonly dishRepository: DishRepository) {}

  async findByIds(ids: string[]) {
    const dishes = await this.dishRepository.findByIds(ids);
    return dishes.map(DishMapper.toDTO);
  }
}
