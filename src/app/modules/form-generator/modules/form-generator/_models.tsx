import { UploadFile } from 'antd'
import { FormikValues } from 'formik'
import { ReactElement } from 'react'
import { ErrMessageType, FieldsType } from '../Core/_types'
import { TInitState, _Field } from '../Core/_models'

export interface Options {
  title: string
  value: string | number
}

interface OptionField {
  children?: any
  [name: string]: any
}

export interface ValueValidationObject {
  [key: string]: string[]
}

export type GeneratedOption = Options & OptionField

export interface FormChangeEvent {
  name: string
  value: any
  objRec: object
}

export interface OptionsState {
  [fieldName: string]: GeneratedOption[]
}

export interface LoadingState {
  [fieldName: string]: boolean
}

export interface OptionParentChildsHandler {
  relations: any[]
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  statedValues: any
}

export interface ValueParentChildHandler {
  relations: RelationState[]
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  statedValues: any
}

interface Option {
  title: string
}

export interface Relation {
  type: string
  parent: string
  Key_value?: string
  KeyID_Option?: string
  KeyValue_Option?: string
  formatter?: (props: any) => any
}

export interface SetErrorsParam {
  [name: string]: string | null
}

export interface FileChangeHandler {
  name: string
  filesOrFile: any[] | any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export interface FieldChangeHandler {
  name: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  values: FormikValues
  value: any
  setErrors: (param: SetErrorsParam) => void
  isArrayType?: boolean
}

export interface MinMaxDateParam {
  type: string
  amount: number
}

export interface ExactMinMaxDate {
  year: number
  month: number
  day: number
}

export interface Field {
  type: string
  name: string
  parentClassName?: string
  label?: string
  placeholder?: string
  className?: string
  lableClassName?: string
  groupClassName?: string
  radClassName?: string
  chkClassName?: string
  option?: Option
  options?: any[]
  testAttr?: string
  LabelKey?: string
  ValueKey?: string
  parentExitFunction?: (props: any) => Promise<any[] | any> | any | void
  relations?: Relation[]
  disabled?: boolean | ((values: FormikValues) => boolean)
  accept?: string
  action?: (file: File) => Promise<string>
  itemRender?: (
    originNode: ReactElement,
    file: UploadFile,
    fileList: object[],
    actions: {
      download: (props: any) => void | any
      preview: (props: any) => void | any
      remove: (props: any) => void | any
    }
  ) => React.ReactNode
  maxCount?: number
  progress?: any
  onRemove?: (file: File) => boolean | Promise<any>
  listType?: string
  uploadHint?: string
  method?: string
  multiple?: boolean
  faDPmode?: string
  minDate?: MinMaxDateParam | ExactMinMaxDate
  maxDate?: MinMaxDateParam | ExactMinMaxDate
}

export interface HandleSubmitObj {
  text: string
  className: string
  handler: (props: any) => Promise<any[] | any | void> | any
}

export interface HandleCancelObj {
  text: string
  className: string
  handler: (props: any) => Promise<any[] | any | void> | any
}

interface ToastErrObj {
  title: string
  className?: string
  paragraphClassName?: string
}

export interface FormGenerator {
  initState: TInitState
  validation?: any | ((values: FormikValues) => any)
  fields: _Field<FieldsType>[]
  conditionalRender?: (values: FormikValues) => _Field<FieldsType>[]
  onFormChange?: (values: any, props?: any) => void
  footerClassName?: string
  handleCancel?: HandleCancelObj | ((values: FormikValues) => HandleCancelObj)
  handleSubmit?: HandleSubmitObj | ((values: FormikValues) => HandleSubmitObj)
  errMessageType: ErrMessageType
  toastErrObj?: ToastErrObj
}

export interface ValueRelationTypes {
  key: string
  name: string
  formatter?: ({}: any) => void | any
}

export interface RelationState {
  name: string
  type: string
  childs: string[] | ValueRelationTypes[]
  KeyID_Option?: string
  KeyValue_Option?: string
}
