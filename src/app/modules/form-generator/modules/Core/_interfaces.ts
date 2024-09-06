import { FormikValues } from 'formik'

import {
  AntdFieldOnPressEnter,
  AntdFieldsOnClear,
  AntdFieldsSize,
  AntdFieldsStatus,
  AntdSelectDefualtValue,
  AntdSelectDropdownRender,
  AntdSelectPlacement,
  DateFormatType,
  DatePickerLimitType,
  DatePickerLimitTypePeriods,
  Direction,
  FaDatePickerResultType,
  ListType,
  RelationTypes,
  ShowCount
} from './_types'
import { Option } from '../../components/CustomCheckbox/_models'
import { GeneratedOption, SetErrorsParam, ValueRelationTypes } from '../form-generator/_models'
import { _FaDatePickerLimitDays } from './_models'
import { CSSProperties, ReactNode, ReactPortal } from 'react'
import { AntdDateType, AntdPanelMode, AntdLocale, AntdTimePickerOptions, AntdPresetRange } from './_types'

interface CountConfig {
  max?: number
  strategy?: (value: string) => number
  show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => ReactNode)
  exceedFormatter?: (value: string, config: { max: number }) => string
}

export interface RelationState {
  name: string
  type: string
  Key_value: string
  formatter?: (props: any) => any
  KeyID_Option: string
  KeyValue_Option: string
}

export interface Relation {
  type: RelationTypes
  parent: string
  Key_value?: string
  KeyID_Option?: string
  KeyValue_Option?: string
  formatter?: (props: any) => any
}

export interface DatePickerLimitDays<TYPE> {
  type: TYPE
  value: TYPE extends 'Exact' ? DatePickerLimitExact : TYPE extends 'Period' ? DatePickerLimitPeriod : never
}

export interface DatePickerLimitExact {
  day: number
  month: number
  year: number
}

export interface DatePickerLimitPeriod {
  period: DatePickerLimitTypePeriods
  amount: number
}

export interface _OptionRelationATTRS {
  childs: string[]
  KeyID_Option: string
  KeyValue_Option: string
}

export interface _ValueRelationATTRS {
  childs: ValueRelationTypes[]
}

export interface ParentExitFunctionObj {
  onChange: (props: any) => Promise<any[] | any> | any | void
  onLoad?: (props: any) => Promise<any[] | any> | any | void
}

export interface FieldBaseATTRS<TYPE> {
  type: TYPE
  name: string
  parentClassName?: string
  className?: string
  label: string
  placeholder?: string
  lableClassName?: string
  testAttr?: string
  parentExitFunction?: ParentExitFunctionObj
  relations?: Relation[]
  disabled?: boolean | ((values: FormikValues) => boolean)
}

export interface CheckboxGroupATTRS {
  groupClassName?: string
  chkClassName?: string
}

export interface RadioGroupATTRS {
  groupClassName?: string
  radClassName?: string
}

export interface OptionsATTRS {
  options?: any[] | undefined
  LabelKey?: string
  ValueKey?: string
}

export interface UploadFieldsBaseATTRS {
  uploadHint: string
  maxCount: number
  accept: string
}

export interface ImageUploadATTRS {
  listType: ListType
}

export interface OnDemandUploadATTRS {
  action?: (props: any) => Promise<string | any | void> | string | any | void
  onRemove?: any
}

export interface CheckBoxATTRS {
  option: Option
  chkClassName?: string
}

export interface FaDatePickerATTRS {
  faDPmode: FaDatePickerResultType
  clock?: boolean
  minDate?: _FaDatePickerLimitDays<DatePickerLimitType>
  maxDate?: _FaDatePickerLimitDays<DatePickerLimitType>
}

export type EnDateDatePicker = {}

export interface RelationBasedATTRS<TYPE> {
  type: TYPE
  parent: string
}

export interface RelationStateATTRS {
  name: string
  type: string
}

export interface ValueRelationATTRS {
  Key_value: string
  formatter?: (props: any) => any
}

export interface OptionRelationATTRS {
  KeyID_Option: string
  KeyValue_Option: string
}

export interface TextFieldATTRS {
  suffix?: ReactNode
  prefix?: ReactNode
  addonAfter?: ReactNode | JSX.Element | ReactPortal
  addonBefore?: ReactNode
  allowClear?: AntdFieldsOnClear
  bordered?: boolean
  count?: CountConfig
  defaultValue?: string
  id?: string
  maxLength?: number
  showCount?: ShowCount
  status?: AntdFieldsStatus
  size?: AntdFieldsSize
  onPressEnter?: AntdFieldOnPressEnter
  direction: Direction
  type?: string
  textType?: string
}

export interface SelectFieldATTRS {
  allowClear?: AntdFieldsOnClear
  onClear?: () => void
  autoClearSearchValue?: boolean
  autoFocus?: boolean
  bordered?: boolean
  defaultActiveFirstOption?: boolean
  defaultOpen?: boolean
  defaultValue?: AntdSelectDefualtValue
  popupClassName?: string
  popupMatchSelectWidth?: boolean | number
  dropdownRender?: AntdSelectDropdownRender
  dropdownStyle?: CSSProperties
  fieldNames?: object
  filterOption?: boolean | ((inputValue: any, option: any) => any)
  filterSort?: (optionA: any, optionB: any) => number
  getPopupContainer?: (triggerNode: any) => any
  labelInValue?: boolean
  loading?: boolean
  maxTagCount?: number | any
  maxTagTextLength?: number
  menuItemSelectedIcon?: ReactNode
  notFoundContent?: ReactNode
  open?: boolean
  optionFilterProp?: string
  optionLabelProp?: string
  placement?: AntdSelectPlacement
  removeIcon?: ReactNode
  searchValue?: string
  showSearch?: boolean
  size?: AntdFieldsSize
  status?: AntdFieldsStatus
  suffixIcon?: ReactNode
  virtual?: boolean
  onBlur?: (props: any) => any
  onDropdownVisibleChange?: (open: any) => any
  direction: Direction
  onSearch?: (e: any) => void
}

export interface CheckboxFieldATTRS {
  indeterminate?: boolean
  autoFocus?: boolean
}

export interface CustomComponent<TYPE> {
  type: TYPE
  name: TYPE
  component: (props: any) => ReactNode
}

export interface NumberFieldATTRS {
  suffix?: any
}

export interface FieldChangeHandlerProps {
  name: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  values: FormikValues
  value: any
  objRec?: GeneratedOption | any
  setErrors: (param: SetErrorsParam) => void
  isArrayType?: boolean
}

export type AntdDatePickerATTRS = {
  defaultValue?: DateFormatType
  format?: DateFormatType
  disabledTime?: (date: any) => any
  renderExtraFooter?: (mode: any) => ReactNode
  showNow?: boolean
  showToday?: boolean
  onOk?: () => any | void
  onPanelChange?: (value: any, mode: any) => void | any
}

export type AntdRangeDatePickerATTRS = {
  allowEmpty?: [boolean, boolean]
  dateRender?: (currentDate: AntdDateType, today: AntdDateType) => React.ReactNode
  cellRender?: (
    current: AntdDateType,
    info: {
      originNode: React.ReactElement
      today: AntdDateType
      range?: 'start' | 'end'
      type: AntdPanelMode
      locale?: AntdLocale
      subType?: 'hour' | 'minute' | 'second' | 'meridiem'
    }
  ) => React.ReactNode
  defaultValue?: [AntdDateType, AntdDateType]
  disabled?: [boolean, boolean]
  disabledTime?: (date: AntdDateType, partial: 'start' | 'end') => void
  format?: string
  presets?: AntdPresetRange[]
  renderExtraFooter?: () => React.ReactNode
  separator?: React.ReactNode
  showTime?: AntdTimePickerOptions | boolean
  onCalendarChange?: (
    dates: [AntdDateType, AntdDateType],
    dateStrings: [string, string],
    info: { range: 'start' | 'end' }
  ) => void
}
