import { Cart } from "../entities/cart.entity";
import { EntityId } from "../value-objects/entity-id.value-object";

export interface CartRepository {
  getCartByCustomerId(customerId: EntityId): Promise<Cart | null>;
  save(cart: Cart): Promise<Cart>;
}
