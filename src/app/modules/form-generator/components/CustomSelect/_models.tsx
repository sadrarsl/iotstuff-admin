import { LoadingState, OptionsState } from '../../modules/form-generator/_models'
import { _Field } from '../../modules/Core/_models'
import { ErrMessageType, FieldsChangeHandler } from '../../modules/Core/_types'

export interface CustomSelect extends _Field<'Select'> {
  fieldsChangeHandler: FieldsChangeHandler
  loadingState: LoadingState
  optionsState: OptionsState
  errMessageType: ErrMessageType
  setFieldValue: any
}
