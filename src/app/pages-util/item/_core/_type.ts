type T_unnecessary_keys = "id";

export type T_fetched_item = {
  id: number;
  name: string;
  itemCategoryId: number;
  quantity: number;
  price: string;
  endedPrice: string;
  extraPackagingCost: string;
};

export type T_item_search = Partial<T_fetched_item>;

export type T_submit = Omit<T_fetched_item, T_unnecessary_keys>;
