import { IdGenerator } from "../../../shared/utils/id-generator";
import { Cart } from "../../domain/entities/cart.entity";
import { CartRepository } from "../../domain/repositories/cart.repository";
import { EntityId } from "../../domain/value-objects/entity-id.value-object";
import { Currency, Money } from "../../domain/value-objects/money.value-object";
import { Quantity } from "../../domain/value-objects/quantity.value-object";
import { DishServiceClient } from "../../domain/services/dish-client.service";
import { CartMapper } from "../mappers/cart.mapper";

interface AddItemToCartRequest {
  customerId: string;
  items: Array<{
    dishId: string;
    quantity: number;
  }>;
}

export class AddItemToCartUseCase {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly idGenerator: IdGenerator,
    private readonly dishServiceClient: DishServiceClient
  ) {}

  async execute(request: AddItemToCartRequest) {
    const customerId = new EntityId(request.customerId);
    let cart = await this.cartRepository.getCartByCustomerId(customerId);

    if (!cart) {
      const id = new EntityId(this.idGenerator.generate());
      cart = new Cart(id, new EntityId(request.customerId));
    }

    const dishIds = request.items.map((item) => item.dishId);
    const dishes = await this.dishServiceClient.getDishesByIds(dishIds);

    cart.addItems(
      request.items.map((item) => {
        const foundDish = dishes.find((dish) => dish.id === item.dishId);

        if (!foundDish) {
          throw new Error(`Dish ${item.dishId} not found`);
        }

        return {
          dishId: new EntityId(item.dishId),
          quantity: new Quantity(item.quantity),
          unitPrice: new Money(
            foundDish.price.amount,
            foundDish.price.currency as Currency
          ),
        };
      })
    );

    const savedCart = await this.cartRepository.save(cart);

    return CartMapper.toDTO(savedCart);
  }
}
