export class Quantity {
  constructor(private readonly value: number) {
    if (!Number.isInteger(value) || value < 1) {
      throw new Error("Quantity must be an integer >= 1");
    }
  }

  getValue() {
    return this.value;
  }
}
