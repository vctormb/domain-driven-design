import { Dish } from "../../domain/entities/dish.entity";
import { DishRepository } from "../../domain/repositories/dish.repository";
import { EntityId } from "../../domain/value-objects/entity-id.value-object";

export class InMemoryDishRepository implements DishRepository {
  private readonly storage = new Map<string, Dish>();

  findByIds(ids: string[]): Promise<Dish[]> {
    const dishes = Array.from(this.storage.values()).filter((dish) =>
      ids.includes(dish.getId().getValue())
    );
    return Promise.resolve(dishes);
  }

  findAll(): Promise<Dish[]> {
    return Promise.resolve(Array.from(this.storage.values()));
  }

  findById(id: EntityId): Promise<Dish | null> {
    return Promise.resolve(this.storage.get(id.getValue()) ?? null);
  }

  save(dish: Dish): Promise<Dish> {
    this.storage.set(dish.getId().getValue(), dish);
    return Promise.resolve(dish);
  }

  delete(id: string): Promise<void> {
    this.storage.delete(id);
    return Promise.resolve();
  }
}
