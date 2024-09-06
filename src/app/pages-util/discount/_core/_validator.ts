import { T_submit, T_fetched_discount } from "./_type";
import * as yup from "yup";

const fetched_data_object_validation = yup.object().shape({
  id: yup.number().required(),
  percentage: yup.string().required(),
  code: yup.string().required(),
  till: yup.string().required(),
});

const fetched_data_validation = yup
  .array()
  .nullable()
  .of(fetched_data_object_validation);

export const filled_data_validation = yup.object().shape({
  percentage: yup.string().required('فیلد الزامیست').typeError("داده ورودی اشتباه است"),
  code: yup.string().required('فیلد الزامیست').typeError("داده ورودی اشتباه است"),
  till: yup.string().required('فیلد الزامیست').typeError("داده ورودی اشتباه است"),
});

export const is_fetched_data_valid = (
  data: unknown
): data is T_fetched_discount[] => {
  return fetched_data_validation.isValidSync(data);
};

export const is_filled_data_valid = (data: unknown): data is T_submit => {
  return filled_data_validation.isValidSync(data);
};

export const is_filled_data_valid_edit = (
  data: unknown
): data is T_fetched_discount => {
  return fetched_data_object_validation.isValidSync(data);
};
