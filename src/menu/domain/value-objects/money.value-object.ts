export type Currency = "USD";

export class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: Currency = "USD"
  ) {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }
    if (!currency) {
      throw new Error("Currency cannot be empty");
    }
    if (currency !== "USD") {
      throw new Error("Currency not supported");
    }
  }

  public getAmount() {
    return this.amount;
  }

  public getCurrency() {
    return this.currency;
  }

  public add(other: Money): Money {
    if (this.currency !== other.getCurrency()) {
      throw new Error("Currencies do not match");
    }
    return new Money(this.amount + other.getAmount(), this.currency);
  }
}
