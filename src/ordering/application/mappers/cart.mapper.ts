import { Cart } from "../../domain/entities/cart.entity";

export class CartMapper {
  static toDTO(cart: Cart) {
    return {
      id: cart.getId().getValue(),
      total: {
        amount: cart.getTotal().getAmount(),
        currency: cart.getTotal().getCurrency(),
      },
      items: cart.getItems().map((item) => ({
        dishId: item.getDishId().getValue(),
        quantity: item.getQuantity().getValue(),
        total: item.getTotal().getAmount(),
        unitPrice: {
          amount: item.getUnitPrice().getAmount(),
          currency: item.getUnitPrice().getCurrency(),
        },
      })),
    };
  }
}
