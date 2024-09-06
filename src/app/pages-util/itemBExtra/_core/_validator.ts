import { T_submit, T_fetched_itemBExtra } from "./_type";
import * as yup from "yup";

const fetched_data_object_validation = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  quantity: yup.string().required(),
  price: yup.string().required(),
  endedPrice: yup.string().required(),
  itemBExtraCategoryId: yup.string().required(),
  extraPackagingCost: yup.string().required(),
  itemExtras: yup
    .array()
    .nullable()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
        min: yup.number().required(),
        max: yup.number().required(),
      })
    ),
});

const fetched_data_validation = yup
  .array()
  .nullable()
  .of(fetched_data_object_validation);

export const filled_data_validation = yup.object().shape({
  itemId: yup
    .string()
    .required("فیلد الزامیست")
    .typeError("داده ورودی اشتباه است"),
  itemExtras: yup
    .array()
    .nullable()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
        min: yup.number().required(),
        max: yup.number().required(),
      })
    ),
});

export const is_fetched_data_valid = (
  data: unknown
): data is T_fetched_itemBExtra[] => {
  return fetched_data_validation.isValidSync(data);
};

export const is_filled_data_valid = (data: unknown): data is T_submit => {
  return filled_data_validation.isValidSync(data);
};

export const is_filled_data_valid_edit = (
  data: unknown
): data is T_fetched_itemBExtra => {
  return fetched_data_object_validation.isValidSync(data);
};
