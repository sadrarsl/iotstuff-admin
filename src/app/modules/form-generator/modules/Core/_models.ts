import { ConditionalField, ConditionalRelation, ConditionalRelationState } from './_generic'
import {
  CustomComponent,
  DatePickerLimitDays,
  FieldBaseATTRS,
  RelationBasedATTRS,
  RelationStateATTRS
} from './_interfaces'
import { DatePickerLimitType, FieldsType, FilesInit, RelationTypes } from './_types'

export type _Field<TYPE extends FieldsType> = TYPE extends 'CustomComponent'
  ? CustomComponent<TYPE>
  : FieldBaseATTRS<TYPE> & ConditionalField<TYPE>

export type _Relation<TYPE extends RelationTypes> = RelationBasedATTRS<TYPE> & ConditionalRelation<TYPE>

export type _FaDatePickerLimitDays<TYPE extends DatePickerLimitType> = DatePickerLimitDays<TYPE>

export type _RelationState<TYPE extends RelationTypes> = RelationStateATTRS & ConditionalRelationState<TYPE>

export type TInitStateValue<TYPE extends FieldsType> = TYPE extends
  | 'Select'
  | 'TextField'
  | 'NumericField'
  | 'CheckBox'
  | 'Radio'
  ? string | number
  : TYPE extends 'FaDatePicker'
  ? Date
  : TYPE extends 'FaRangeDatePicker'
  ? { from: Date; to: Date }
  : TYPE extends 'CheckBoxGroup' | 'MultiSelect'
  ? string[] | number[]
  : TYPE extends 'ImageUpload' | 'UploadZone'
  ? FilesInit[]
  : TYPE extends 'CustomComponent'
  ? any
  : never

export type TInitState = {
  [key: string | number]: TInitStateValue<FieldsType>
}
