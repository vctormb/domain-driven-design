export class EntityId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("EntityId cannot be empty");
    }
  }

  public getValue() {
    return this.value;
  }
}
