import { _Field } from '../../modules/Core/_models'
import { ErrMessageType, FieldsChangeHandler } from '../../modules/Core/_types'

export interface Option {
  title: string
}

export interface CustomEnRangeDatePicker extends _Field<'EnRangeDatePicker'> {
  fieldsChangeHandler: FieldsChangeHandler
  errMessageType: ErrMessageType
}
