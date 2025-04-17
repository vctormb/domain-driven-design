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
 * This service is a client that consumes data from `menu` context
 */
export interface DishServiceClient {
  getDishesByIds(dishIds: string[]): Promise<DishDTO[]>;
}
