import { v4 as uuidv4 } from "uuid";
import { IdGenerator } from "./id-generator";

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
}
