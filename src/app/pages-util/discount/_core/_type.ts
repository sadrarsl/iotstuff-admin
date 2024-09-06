type T_unnecessary_keys = "id";

export type T_fetched_discount = {
  id: number;
  percentage: number;
  code: string;
  shopId: number;
  till: Date;
};

export type T_discount_search = Partial<T_fetched_discount>;

export type T_submit = Omit<T_fetched_discount, T_unnecessary_keys>;
