import { FormikValues } from 'formik'
import { LoadingState, OptionsState } from '../../modules/form-generator/_models'
import {
  ErrMessageType,
  FieldsChangeHandler,
  ListType,
  UploadFieldType,
  UploadMethods
} from '../../modules/Core/_types'

export interface CustomImageUpload {
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
  action?: (props: any) => Promise<string | any | void> | string | any | void
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
