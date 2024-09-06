import { Field } from 'formik'
import { CustomEnRangeDatePicker } from './_models'
import { EnRangeDatePicker } from '../Forms/EnRangeDatePicker/EnRangeDatePicker'
import { Typography } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  testAttr,
  lableClassName,
  className,
  fieldsChangeHandler,
  disabled,
  errMessageType
}: CustomEnRangeDatePicker) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}

      <Field
        className={className}
        component={EnRangeDatePicker}
        disabled={disabled}
        testAttr={testAttr}
        name={name}
        fieldsChangeHandler={fieldsChangeHandler}
        errMessageType={errMessageType}
      />
    </div>
  )
}
