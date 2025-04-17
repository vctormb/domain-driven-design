import { Cart } from "../../domain/entities/cart.entity";
import { CartRepository } from "../../domain/repositories/cart.repository";
import { EntityId } from "../../domain/value-objects/entity-id.value-object";

export class InMemoryCartRepository implements CartRepository {
  private readonly storage = new Map<string, Cart>();

  getCartByCustomerId(customerId: EntityId): Promise<Cart | null> {
    for (const cart of this.storage.values()) {
      if (cart.getCustomerId().getValue() === customerId.getValue()) {
        return Promise.resolve(cart);
      }
    }
    return Promise.resolve(null);
  }

  save(cart: Cart): Promise<Cart> {
    this.storage.set(cart.getId().getValue(), cart);
    return Promise.resolve(cart);
  }
}
