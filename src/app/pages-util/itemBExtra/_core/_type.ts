type T_unnecessary_keys = "id";

export type T_fetched_itemBExtra = {
  id: number;
  name: string;
  itemBExtraCategoryId: number;
  quantity: number;
  price: string;
  endedPrice: string;
  itemId:any
  extraPackagingCost: string;
  itemExtras: { id: number; name: string; min: number; max: number }[];
};

export type T_itemBExtra_search = Partial<T_fetched_itemBExtra>;

export type T_submit = Omit<T_fetched_itemBExtra, T_unnecessary_keys>;
