import { Typography } from 'antd'
import { Checkbox } from '../Forms/checkbox/Checkbox'
import { CustomCheckbox } from './_models'
import { Field } from 'formik'

export default ({
  parentClassName,
  label,
  name,
  testAttr,
  lableClassName,
  option,
  className,
  chkClassName,
  fieldsChangeHandler,
  disabled,
  errMessageType
}: CustomCheckbox) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}

      <div className={chkClassName || 'd-flex gap-2'}>
        {' '}
        <Field
          className={className}
          component={Checkbox}
          disabled={disabled}
          testAttr={testAttr}
          name={name}
          fieldsChangeHandler={fieldsChangeHandler}
          errMessageType={errMessageType}
        />
        {option?.title}
      </div>
    </div>
  )
}
