import { EnDateDatePicker } from '../Forms/EnDatePicker/EnDatePicker'
import { Field } from 'formik'
import { CustomEnDatePicker } from './_models'
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
}: CustomEnDatePicker) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}

      <Field
        className={className}
        component={EnDateDatePicker}
        disabled={disabled}
        testAttr={testAttr}
        name={name}
        fieldsChangeHandler={fieldsChangeHandler}
        errMessageType={errMessageType}
      />
    </div>
  )
}
