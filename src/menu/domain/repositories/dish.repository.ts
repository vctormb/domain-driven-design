import { Dish } from "../entities/dish.entity";
import { EntityId } from "../value-objects/entity-id.value-object";

export interface DishRepository {
  findAll(): Promise<Dish[]>;
  findById(id: EntityId): Promise<Dish | null>;
  save(dish: Dish): Promise<Dish>;
  delete(id: string): Promise<void>;
  findByIds(ids: string[]): Promise<Dish[]>;
}
