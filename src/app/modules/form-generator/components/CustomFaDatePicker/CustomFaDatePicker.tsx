import { Field } from 'formik'
import { CustomFaDatePicker } from './_models'
import FaDatePicker from '../Forms/FaDatePicker/FaDatePicker'
import { Typography } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  placeholder,
  className,
  lableClassName,
  testAttr,
  fieldsChangeHandler,
  optionsState,
  loadingState,
  errMessageType,
  setFieldValue,
  disabled,
  faDPmode,
  minDate,
  maxDate,
  clock
}: CustomFaDatePicker) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}
      <Field
        name={name && name}
        component={FaDatePicker}
        className={className}
        placeholder={placeholder && placeholder}
        testAttr={testAttr || ''}
        errMessageType={errMessageType}
        setFieldValue={setFieldValue}
        faDPmode={faDPmode}
        clock={clock}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        options={optionsState[name] && optionsState[name].length !== 0 ? optionsState[name] : null}
        fieldsChangeHandler={fieldsChangeHandler}
        type='search'
        loadingState={loadingState}
      />
    </div>
  )
}
