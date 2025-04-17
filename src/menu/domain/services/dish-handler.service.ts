export interface DishDTO {
  id: string;
  description: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
}

/**
 * This service is a handler that exposes data to other contexts
 */
export interface DishServiceHandler {
  getDishesByIds(dishIds: string[]): Promise<DishDTO[]>;
}
