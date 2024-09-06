import { AntdRangeDatePickerATTRS } from './_interfaces'
import {
  AntdDatePickerATTRS,
  CheckBoxATTRS,
  CheckboxFieldATTRS,
  CheckboxGroupATTRS,
  DatePickerLimitExact,
  DatePickerLimitPeriod,
  FaDatePickerATTRS,
  OnDemandUploadATTRS,
  OptionRelationATTRS,
  OptionsATTRS,
  RadioGroupATTRS,
  SelectFieldATTRS,
  TextFieldATTRS,
  ValueRelationATTRS,
  _OptionRelationATTRS,
  _ValueRelationATTRS
} from './_interfaces'
import {
  DatePickerLimitType,
  FieldsType,
  ImageUploadField,
  RelationTypes,
  UploadFieldType,
  UploadZoneField
} from './_types'

export type ConditionalRelation<TYPE extends RelationTypes> = TYPE extends 'Option'
  ? OptionRelationATTRS
  : TYPE extends 'Value'
  ? ValueRelationATTRS
  : never

export type ConditionalField<TYPE extends FieldsType> = TYPE extends 'Select' | 'MultiSelect'
  ? OptionsATTRS & SelectFieldATTRS
  : TYPE extends 'CheckBoxGroup'
  ? OptionsATTRS & CheckboxGroupATTRS & CheckboxFieldATTRS
  : TYPE extends 'ImageUpload'
  ? ImageUploadField
  : TYPE extends 'UploadZone'
  ? UploadZoneField
  : TYPE extends 'CheckBox'
  ? CheckBoxATTRS & CheckboxFieldATTRS
  : TYPE extends 'FaDatePicker' | 'FaRangeDatePicker'
  ? FaDatePickerATTRS
  : TYPE extends 'TextField' | 'NumericField'
  ? TextFieldATTRS & TextFieldATTRS
  : TYPE extends 'Radio'
  ? OptionsATTRS & RadioGroupATTRS
  : TYPE extends 'EnDatePicker'
  ? AntdDatePickerATTRS
  : TYPE extends 'EnRangeDatePicker'
  ? AntdRangeDatePickerATTRS
  : never

export type ConditionalUploadFieldType<TYPE extends UploadFieldType> = TYPE extends 'OnChange'
  ? OnDemandUploadATTRS
  : never

export type ConditionalRelationState<TYPE extends RelationTypes> = TYPE extends 'Option'
  ? _OptionRelationATTRS
  : TYPE extends 'Value'
  ? _ValueRelationATTRS
  : never

export type ConditionalDatePickerLimitDays<TYPE extends DatePickerLimitType> = TYPE extends 'Exact'
  ? DatePickerLimitExact
  : TYPE extends 'Period'
  ? DatePickerLimitPeriod
  : never
