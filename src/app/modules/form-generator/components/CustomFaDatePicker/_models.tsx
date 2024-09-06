import { LoadingState, OptionsState } from '../../modules/form-generator/_models'
import { _Field } from '../../modules/Core/_models'
import { ErrMessageType, FieldsChangeHandler } from '../../modules/Core/_types'

export interface CustomFaDatePicker extends _Field<'FaDatePicker'> {
  fieldsChangeHandler: FieldsChangeHandler
  loadingState: LoadingState
  optionsState: OptionsState
  errMessageType: ErrMessageType
  setFieldValue: any
}
