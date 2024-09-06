type T_unnecessary_keys = "id";

export type T_fetched_itemCategory = {
  id: number;
  name: string;
};

export type T_itemCategory_search = Partial<T_fetched_itemCategory>;

export type T_submit = Omit<T_fetched_itemCategory, T_unnecessary_keys>;
