import { IdGenerator } from "../../../shared/utils/id-generator";
import { Dish } from "../../domain/entities/dish.entity";
import { DishRepository } from "../../domain/repositories/dish.repository";
import { EntityId } from "../../domain/value-objects/entity-id.value-object";
import { Currency, Money } from "../../domain/value-objects/money.value-object";

export interface AddDishRequest {
  name: string;
  price: number;
  currency: Currency;
  description: string;
}

export class AddDishUseCase {
  constructor(
    private readonly idGenerator: IdGenerator,
    private readonly dishRepository: DishRepository
  ) {}

  async execute(request: AddDishRequest): Promise<void> {
    const id = new EntityId(this.idGenerator.generate());
    const price = new Money(request.price, request.currency);
    const dish = new Dish(id, request.name, price, request.description);

    await this.dishRepository.save(dish);
  }
}
