type T_unnecessary_keys = "id";

export type T_fetched_user = {
  id: number;
  email: string;
  roleId: number;
  phoneNumber: string;
};

export type T_user_search = Partial<T_fetched_user>;

export type T_submit = Omit<T_fetched_user, T_unnecessary_keys>;
