import { EntityId } from "../value-objects/entity-id.value-object";
import { Money } from "../value-objects/money.value-object";
import { Quantity } from "../value-objects/quantity.value-object";
import { CartItem } from "./cart-item.entity";

interface AddItemParams {
  dishId: EntityId;
  unitPrice: Money;
  quantity: Quantity;
}

export class Cart {
  private items: CartItem[] = [];

  constructor(
    private readonly id: EntityId,
    private readonly customerId: EntityId
  ) {}

  getId(): EntityId {
    return this.id;
  }

  getCustomerId(): EntityId {
    return this.customerId;
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(input: AddItemParams) {
    const existingItem = this.items.find(
      (item) => item.getDishId().getValue() === input.dishId.getValue()
    );
    if (existingItem) {
      existingItem.increase(input.quantity);
    } else {
      this.items.push(
        new CartItem(input.dishId, input.unitPrice, input.quantity)
      );
    }
  }

  addItems(items: AddItemParams[]) {
    for (const item of items) {
      this.addItem(item);
    }
  }

  removeItem(dishId: EntityId) {
    this.items = this.items.filter(
      (item) => item.getDishId().getValue() !== dishId.getValue()
    );
  }

  getTotal() {
    if (this.items.length === 0) {
      return new Money(0, "USD");
    }

    const total = this.items.reduce((acc, curr) => {
      return acc + curr.getTotal().getAmount();
    }, 0);

    const currency = this.items[0].getUnitPrice().getCurrency();

    return new Money(total, currency);
  }
}
