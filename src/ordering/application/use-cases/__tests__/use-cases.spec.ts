import { AddItemToCartUseCase } from "../add-item-to-cart.use-case";
import { ViewCartUseCase } from "../view-cart.use-case";
import { InMemoryCartRepository } from "../../../infrastructure/repositories/in-memory-cart.repository";
import {
  DishService,
  InMemoryDishServiceClient,
} from "../../../infrastructure/services/in-memory-dish-client.service";
import { DishDTO } from "../../../domain/services/dish-client.service";
import { IdGenerator } from "../../../../shared/utils/id-generator";

class DishServiceStub implements DishService {
  constructor(private readonly dishes: DishDTO[]) {}

  findByIds(ids: string[]): Promise<DishDTO[]> {
    return Promise.resolve(this.dishes.filter((dish) => ids.includes(dish.id)));
  }
}

class IdGeneratorStub implements IdGenerator {
  private counter = 0;

  generate(): string {
    return String(this.counter + 1);
  }
}

describe("Ordering Use Cases", () => {
  it("should add items to a cart even if cart does not exist", async () => {
    const idGenerator = new IdGeneratorStub();
    const cartRepo = new InMemoryCartRepository();
    const dishServiceStub = new DishServiceStub([
      {
        id: "1",
        name: "Food 1",
        description: "Food 1 description",
        price: { amount: 1050, currency: "USD" },
      },
      {
        id: "2",
        name: "Food 2",
        description: "Food 2 description",
        price: { amount: 2000, currency: "USD" },
      },
    ]);
    const dishServiceClient = new InMemoryDishServiceClient(
      dishServiceStub
    );
    const addItemToCartUseCase = new AddItemToCartUseCase(
      cartRepo,
      idGenerator,
      dishServiceClient
    );

    const request = {
      customerId: "1",
      items: [
        {
          dishId: "1",
          quantity: 2,
          unitPrice: { amount: 1050, currency: "USD" },
        },
        {
          dishId: "2",
          quantity: 1,
          unitPrice: { amount: 2000, currency: "USD" },
        },
      ],
    };

    await addItemToCartUseCase.execute(request);

    const viewCartUseCase = new ViewCartUseCase(cartRepo);
    const cart = await viewCartUseCase.execute({
      customerId: request.customerId,
    });

    expect(cart.id).toBe("1");
    expect(cart.total).toStrictEqual({
      amount: 4100,
      currency: "USD",
    });
    expect(cart.items).toEqual([
      { ...request.items[0], total: 2100 },
      { ...request.items[1], total: 2000 },
    ]);
  });
});
