import {
  DishDTO,
  DishServiceClient,
} from "../../domain/services/dish-client.service";

export interface DishService {
  findByIds(ids: string[]): Promise<DishDTO[]>;
}

export class InMemoryDishServiceClient implements DishServiceClient {
  constructor(private readonly dishService: DishService) {}

  async getDishesByIds(dishIds: string[]): Promise<DishDTO[]> {
    return await this.dishService.findByIds(dishIds);
  }
}
