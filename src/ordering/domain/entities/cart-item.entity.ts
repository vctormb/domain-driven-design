import { EntityId } from "../value-objects/entity-id.value-object";
import { Quantity } from "../value-objects/quantity.value-object";
import { Money } from "../value-objects/money.value-object";

export class CartItem {
  constructor(
    private readonly dishId: EntityId,
    private readonly unitPrice: Money,
    private quantity: Quantity
  ) {}

  getDishId(): EntityId {
    return this.dishId;
  }

  getQuantity(): Quantity {
    return this.quantity;
  }

  getUnitPrice(): Money {
    return this.unitPrice;
  }

  getTotal() {
    const total = this.unitPrice.getAmount() * this.quantity.getValue();
    return new Money(total, this.unitPrice.getCurrency());
  }

  increase(quantity: Quantity) {
    const newQuantity = this.quantity.getValue() + quantity.getValue();
    this.quantity = new Quantity(newQuantity);
  }

  changeQuantity(quantity: Quantity) {
    this.quantity = quantity;
  }
}
