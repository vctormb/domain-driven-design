import { AddDishUseCase } from "../add-dish.use-case";
import { ListDishesUseCase } from "../list-dishes.use-case";
import { InMemoryDishRepository } from "../../../infrastructure/repositories/in-memory-dish.repository";
import { Currency } from "../../../domain/value-objects/money.value-object";
import { IdGenerator } from "../../../../shared/utils/id-generator";

class IdGeneratorStub implements IdGenerator {
  private counter = 0;

  generate(): string {
    return String(this.counter + 1);
  }
}

describe("Menu Use Cases", () => {
  it("should add a dish and list it", async () => {
    const idGenerator = new IdGeneratorStub();
    const dishRepo = new InMemoryDishRepository();
    const addDishUseCase = new AddDishUseCase(idGenerator, dishRepo);

    const request = {
      name: "Margherita Pizza",
      price: 12.99,
      currency: "USD" as Currency,
      description: "Classic pizza with tomato, mozzarella, and basil",
    };

    await addDishUseCase.execute(request);

    const lishDishUseCase = new ListDishesUseCase(dishRepo);
    const output = await lishDishUseCase.execute();

    const dish = output[0];

    expect(output).toHaveLength(1);
    expect(dish.id).toBe("1");
    expect(dish.name).toBe(request.name);
    expect(dish.price.amount).toBe(request.price);
    expect(dish.price.currency).toBe(request.currency);
    expect(dish.description).toBe(request.description);
  });
});
