import { Radio as AntdRadio } from 'antd'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { Radio } from './_models'

export default ({ name, value, form, field, fieldsChangeHandler, obj, setFieldErr, disabled }: Radio) => {
  const { values, errors, setFieldValue, setErrors }: any = useFormikContext()

  useEffect(() => {
    if (errors[field.name]) {
      setFieldErr(errors[field.name])
    } else {
      setFieldErr(undefined)
    }
  }, [errors[field.name], values])

  return (
    <>
      <AntdRadio
        name={name}
        value={value}
        disabled={typeof disabled === 'function' ? disabled(values) : disabled}
        checked={form.values[field.name] === value ? true : false}
        onChange={e => {
          fieldsChangeHandler({
            name: field.name,
            setFieldValue,
            setErrors,
            values: { ...values, [field.name]: e.target.value },
            value: e.target.value
          })
        }}
      />
    </>
  )
}
