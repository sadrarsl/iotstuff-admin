import { FormikValues } from 'formik'
import {
  ErrMessageType,
  FieldsChangeHandler,
  ListType,
  UploadFieldType,
  UploadMethods
} from '../../modules/Core/_types'
import { LoadingState, OptionsState } from '../../modules/form-generator/_models'

export interface CustomUploadZone {
  fieldsChangeHandler: FieldsChangeHandler
  loadingState: LoadingState
  optionsState: OptionsState
  errMessageType: ErrMessageType
  type: UploadFieldType
  uploadHint: string
  maxCount: number
  accept: string
  listType: ListType
  resultType: 'Base64' | 'File'
  action?: (file: any) => Promise<string | void>
  method?: UploadMethods
  onRemove?: any
  parentClassName?: string
  label?: string
  name: string
  placeholder?: string
  className?: string
  testAttr?: string
  lableClassName?: string
  filesChangeHandler: any

  disabled?: boolean | ((values: FormikValues) => boolean)
}
