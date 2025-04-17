import { Dish } from "../../domain/entities/dish.entity";

export class DishMapper {
  static toDTO(dish: Dish) {
    return {
      id: dish.getId().getValue(),
      description: dish.getDescription(),
      name: dish.getName(),
      price: {
        amount: dish.getPrice().getAmount(),
        currency: dish.getPrice().getCurrency(),
      },
    };
  }
}
