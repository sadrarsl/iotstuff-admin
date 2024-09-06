import { Checkbox as AntdCheckbox, Typography } from 'antd'
import { useFormikContext } from 'formik'
import { Checkbox as CheckboxModel } from './_models'

export function Checkbox({
  field,
  form,
  children,
  className,
  value,
  fieldsChangeHandler,
  errMessageType,
  disabled,
  indeterminate,
  autoFocus
}: CheckboxModel): JSX.Element {
  const { values, errors, setErrors }: any = useFormikContext()

  return (
    <>
      <input type='checkbox' style={{ display: 'none' }} />
      <label className='checkbox checkbox-lg checkbox-single'>
        <AntdCheckbox
          checked={values[field.name] === value}
          value={value}
          disabled={disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false}
          autoFocus={autoFocus && autoFocus}
          indeterminate={indeterminate && indeterminate}
          className={className}
          onChange={e => {
            fieldsChangeHandler({
              name: field.name,
              setFieldValue: form.setFieldValue,
              values: { ...values, [field.name]: e.target.checked },
              value: e.target.checked,
              setErrors
            })
          }}
        />
        {children}
        <span />
        {errMessageType === 'Field' && errors[field.name] && (
          <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
        )}
      </label>
    </>
  )
}
