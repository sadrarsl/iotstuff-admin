import { T_submit, T_fetched_item } from './_type'
import * as yup from 'yup'


const fetched_data_object_validation = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  quantity: yup.string().required(),
  price: yup.string().required(),
  endedPrice: yup.string().required(),
  itemCategoryId: yup.string().required(),
  extraPackagingCost: yup.string().required(),

})

const fetched_data_validation = yup.array().nullable().of(fetched_data_object_validation)

export const filled_data_validation = yup.object().shape({
  is_active: yup.string().required('فیلد الزامیست').typeError('داده ورودی اشتباه است'),
  name: yup.string().required('فیلد الزامیست').typeError('داده ورودی اشتباه است'),
  quantity: yup.string().required('فیلد الزامیست').typeError('داده ورودی اشتباه است'),
  itemCategoryId: yup.string().required('فیلد الزامیست').typeError('داده ورودی اشتباه است'),
  price: yup.string().required('فیلد الزامیست').typeError('داده ورودی اشتباه است'),
  endedPrice: yup.string().required('فیلد الزامیست').typeError('داده ورودی اشتباه است'),
  extraPackagingCost: yup.string().required('فیلد الزامیست').typeError('داده ورودی اشتباه است'),

})

export const is_fetched_data_valid = (data: unknown): data is T_fetched_item[] => {
  return fetched_data_validation.isValidSync(data)
}

export const is_filled_data_valid = (data: unknown): data is T_submit => {
  return filled_data_validation.isValidSync(data)
}

export const is_filled_data_valid_edit = (data: unknown): data is T_fetched_item => {
  return fetched_data_object_validation.isValidSync(data)
}
