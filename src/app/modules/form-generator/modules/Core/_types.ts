import { ReactNode } from 'react'
import { ImageUploadATTRS, OnDemandUploadATTRS, UploadFieldsBaseATTRS } from './_interfaces'
import { LabeledValue } from 'antd/es/select'
import { FieldChangeHandler } from '../form-generator/_models'

import type { Dayjs } from 'dayjs'

export type FieldsType =
  | 'TextField'
  | 'FaDatePicker'
  | 'FaRangeDatePicker'
  | 'NumericField'
  | 'ImageUpload'
  | 'UploadZone'
  | 'CheckBox'
  | 'CheckBoxGroup'
  | 'Select'
  | 'MultiSelect'
  | 'Radio'
  | 'EnDatePicker'
  | 'EnRangeDatePicker'
  | 'CustomComponent'

export type UploadMethods = 'POST' | 'post' | 'put' | 'PUT' | 'PATCH' | 'patch' | 'GET' | 'get' | 'HEAD' | 'head'

export type UploadFieldType = 'OnChange' | 'OnSubmit'

export type ListType = 'picture' | 'picture-card' | 'picture-circle' | 'text'

export type FileUploadOnRemove = (file: File) => boolean | Promise<any> | any

export type FaDatePickerResultType = 'Georgian' | 'Jalalli'

export type DatePickerLimitType = 'Exact' | 'Period'

export type DatePickerLimitTypePeriods = 'Month' | 'Year' | 'Day' | 'Week'

export type RelationTypes = 'Option' | 'Value'

export type ShowCount =
  | boolean
  | {
      formatter: (info: { value: string; count: number; maxLength?: number }) => ReactNode
    }

export type AntdFieldsStatus = 'error' | 'warning'

export type AntdFieldsSize = 'large' | 'middle' | 'small'

export type AntdFieldOnPressEnter = (e: any) => any

export type AntdFieldsOnClear = boolean | { clearIcon?: ReactNode }

export type AntdSelectDefualtValue = string | string[] | number | number[] | LabeledValue | LabeledValue[]

export type AntdSelectDropdownRender = (originNode: ReactNode) => ReactNode | any

export type AntdSelectPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'

export type ImageUploadField = UploadFieldsBaseATTRS & OnDemandUploadATTRS & ImageUploadATTRS

export type UploadZoneField = UploadFieldsBaseATTRS & OnDemandUploadATTRS

export type FieldsChangeHandler = (params: FieldChangeHandler) => Promise<void>

export type ErrMessageType = 'Field' | 'Toast'

export type Direction = 'rtl' | 'ltr' | undefined

export type FilesInit = {
  uid?: string | number
  name?: string
  status: 'done'
  url: string
}

type Generic = string
type GenericFn = (value: Dayjs) => string
export type DateFormatType = Generic | GenericFn | Array<Generic | GenericFn>

export type AntdDateType = Dayjs

export type AntdPanelMode = 'date' | 'month' | 'year' | 'decade'

export type AntdLocale = string

export type AntdMeridiem = 'AM' | 'PM'

export type AntdPresetRange = {
  label: React.ReactNode
  value: (AntdDateType | (() => AntdDateType))[]
}

export type AntdTimePickerOptions = {
  defaultValue?: AntdDateType[]
}
