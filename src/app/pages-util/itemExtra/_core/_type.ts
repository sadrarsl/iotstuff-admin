type T_unnecessary_keys = "id";

export type T_fetched_itemExtra = {
  id: number;
  name: string;
  itemExtraCategoryId: number;
  quantity: number;
  price: string;
  endedPrice: string;
  extraPackagingCost: string;
};

export type T_itemExtra_search = Partial<T_fetched_itemExtra>;

export type T_submit = Omit<T_fetched_itemExtra, T_unnecessary_keys>;
