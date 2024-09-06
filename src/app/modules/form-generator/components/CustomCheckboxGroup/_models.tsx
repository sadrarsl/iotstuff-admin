import { LoadingState, OptionsState } from '../../modules/form-generator/_models'
import { _Field } from '../../modules/Core/_models'
import { ErrMessageType, FieldsChangeHandler } from '../../modules/Core/_types'

export interface CustomCheckboxGroup extends _Field<'CheckBoxGroup'> {
  fieldsChangeHandler: FieldsChangeHandler
  loadingState: LoadingState
  arrayTypeDeSelectHandler: any
  optionsState: OptionsState
  errMessageType: ErrMessageType
  optionalFieldDeleteAllHandler: any
}
