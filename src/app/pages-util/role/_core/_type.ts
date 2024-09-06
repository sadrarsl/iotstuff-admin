type T_unnecessary_keys = "id";

export type T_fetched_role = {
  id: number;
  name: string;
  permissions: string[];
};

export type T_role_search = Partial<T_fetched_role>;

export type T_submit = Omit<T_fetched_role, T_unnecessary_keys>;
