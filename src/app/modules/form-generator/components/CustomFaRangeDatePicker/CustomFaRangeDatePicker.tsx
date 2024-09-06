import { Field } from 'formik'
import { CustomFaRangeDatePicker } from './_models'
import FaRangeDatePicker from '../Forms/FaRangeDatePicker/FaRangeDatePicker'
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
  maxDate
}: CustomFaRangeDatePicker) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}
      <Field
        name={name && name}
        component={FaRangeDatePicker}
        className={className}
        placeholder={placeholder && placeholder}
        testAttr={testAttr || ''}
        errMessageType={errMessageType}
        setFieldValue={setFieldValue}
        faDPmode={faDPmode}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        options={optionsState[name] && optionsState[name].length !== 0 ? optionsState[name] : null}
        fieldsChangeHandler={fieldsChangeHandler}
        type='search'
        loadingState={loadingState}
      />
    </div>
  )
}
