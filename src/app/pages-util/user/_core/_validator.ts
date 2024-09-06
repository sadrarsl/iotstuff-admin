import { T_submit, T_fetched_user } from "./_type";
import * as yup from "yup";

const fetched_data_object_validation = yup.object().shape({
  id: yup.number().required(),
});

const fetched_data_validation = yup
  .array()
  .nullable()
  .of(fetched_data_object_validation);

export const filled_data_validation = yup.object().shape({});

export const is_fetched_data_valid = (
  data: unknown
): data is T_fetched_user[] => {
  return fetched_data_validation.isValidSync(data);
};

export const is_filled_data_valid = (data: unknown): data is T_submit => {
  return filled_data_validation.isValidSync(data);
};

export const is_filled_data_valid_edit = (
  data: unknown
): data is T_fetched_user => {
  return fetched_data_object_validation.isValidSync(data);
};
