import { EntityId } from "../value-objects/entity-id.value-object";
import { Money } from "../value-objects/money.value-object";

export class Dish {
  constructor(
    private readonly id: EntityId,
    private name: string,
    private price: Money,
    private description: string,
    private available: boolean = true
  ) {
    if (!description || description.trim().length === 0) {
      throw new Error("Dish description cannot be empty");
    }
    if (!name || name.trim().length === 0) {
      throw new Error("Dish name cannot be empty");
    }
  }

  public getId() {
    return this.id;
  }

  public getDescription() {
    return this.description;
  }

  public getName() {
    return this.name;
  }

  public getPrice() {
    return this.price;
  }

  public isAvailable() {
    return this.available;
  }

  public rename(newName: string) {
    if (!newName || newName.trim().length === 0) {
      throw new Error("Dish name cannot be empty");
    }
    this.name = newName;
  }

  public changeDescription(newDescription: string) {
    if (!newDescription || newDescription.trim().length === 0) {
      throw new Error("Dish description cannot be empty");
    }
    this.description = newDescription;
  }

  public changePrice(newPrice: Money) {
    this.price = newPrice;
  }

  public changeAvailability(isAvailable: boolean) {
    this.available = isAvailable;
  }
}
