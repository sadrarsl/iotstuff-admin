import { Input as AntdInput, Spin, Typography } from 'antd'
import { useFormikContext } from 'formik'
import { Input } from './_models'
import { useEffect, useState } from 'react'
import { fixNumbers } from '../../../modules/form-generator/functions'

export default ({
  field, // { name, value, onChange, onBlur }
  label,
  fieldsChangeHandler,
  className,
  errMessageType,
  loadingState,
  disabled,
  addonAfter,
  addonBefore,
  allowClear,
  bordered,
  count,
  defaultValue,
  maxLength,
  onPressEnter,
  prefix,
  showCount,
  size,
  status,
  suffix
}: Input): JSX.Element => {
  const { values, setFieldValue, setErrors, errors }: any = useFormikContext()
  const [value, setValue] = useState<number | undefined>(undefined)

  function retainDigits(str: any) {
    return str.replace(/\D/g, '') // Use regular expression to replace non-digit characters with an empty string
  }

  useEffect(() => {
    if (values[field.name] && !value) {
      setValue(values[field.name])
    } else if (!values[field.name]) {
      setValue(undefined)
    }
  }, [values])

  return (
    <>
      {label && <label> {label} وارد کنید </label>}
      <Spin spinning={loadingState ? loadingState[field.name] && loadingState[field.name] : false}>
        <AntdInput
          className={className}
          value={value}
          disabled={disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          allowClear={allowClear}
          bordered={bordered}
          count={count}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onPressEnter={onPressEnter}
          prefix={prefix}
          showCount={showCount}
          dir='ltr'
          size={size}
          suffix={suffix}
          status={status || errors[field.name] ? 'error' : ''}
          onChange={e => {
            if (e.target.value) {
              const newValue: any = e.target.value
              if (isNaN(fixNumbers(newValue))) {
                setValue(retainDigits(newValue))
              } else {
                setValue(fixNumbers(newValue))
                fieldsChangeHandler({
                  name: field.name,
                  setFieldValue,
                  values: {
                    ...values,
                    [field.name]: +fixNumbers(newValue)
                  },
                  setErrors,
                  value: +fixNumbers(newValue)
                })
              }
            } else {
              setValue(undefined)
              fieldsChangeHandler({
                name: field.name,
                setFieldValue,
                values: {
                  ...values,
                  [field.name]: undefined
                },
                setErrors,
                value: undefined
              })
            }
          }}
        />
      </Spin>
      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
    </>
  )
}
