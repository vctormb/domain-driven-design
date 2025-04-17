import { CartRepository } from "../../domain/repositories/cart.repository";
import { EntityId } from "../../domain/value-objects/entity-id.value-object";
import { CartMapper } from "../mappers/cart.mapper";

export interface ViewCartRequest {
  customerId: string;
}

export class ViewCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(request: ViewCartRequest) {
    const customerId = new EntityId(request.customerId);
    const cart = await this.cartRepository.getCartByCustomerId(customerId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    return CartMapper.toDTO(cart);
  }
}
