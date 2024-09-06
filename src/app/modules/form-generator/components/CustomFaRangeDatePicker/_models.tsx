import { LoadingState, OptionsState } from '../../modules/form-generator/_models'
import { ErrMessageType, FieldsChangeHandler } from '../../modules/Core/_types'
import { _Field } from '../../modules/Core/_models'

export interface CustomFaRangeDatePicker extends _Field<'FaRangeDatePicker'> {
  fieldsChangeHandler: FieldsChangeHandler
  loadingState: LoadingState
  optionsState: OptionsState
  errMessageType: ErrMessageType
  setFieldValue: any
}
