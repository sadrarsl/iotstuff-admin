import { Checkbox as AntdCheckbox } from 'antd'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { CheckboxGroup } from './_models'

export function Checkbox({
  field,
  children,
  value,
  obj,
  fieldsChangeHandler,
  setFieldErr,
  disabled,
  arrayTypeDeSelectHandler,
  autoFocus,
  className
}: CheckboxGroup) {
  const { values, errors, setFieldValue, setErrors }: any = useFormikContext()

  useEffect(() => {
    if (errors[field.name]) {
      setFieldErr(errors[field.name])
    } else {
      setFieldErr(undefined)
    }
  }, [errors[field.name]])

  return (
    <>
      <input type='checkbox' style={{ display: 'none' }} />
      <label className='checkbox checkbox-lg checkbox-single'>
        <AntdCheckbox
          checked={values[field?.name] && values[field?.name].find((el: any) => el === value)}
          value={value}
          className={className && className}
          autoFocus={autoFocus && autoFocus}
          disabled={disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false}
          name={field?.name}
          onChange={e => {
            const isChecked = e.target.checked
            if (isChecked) {
              let valies = values[field.name]
              const val = e.target.value

              if (!valies) {
                valies = [val]
              } else {
                const isCheckec = valies.find((le: any) => le === e.target.value)

                if (isCheckec) {
                  valies = valies.filter((b: any) => b !== e.target.value)
                } else {
                  valies = [...valies, val]
                }
              }

              fieldsChangeHandler({
                name: field.name,
                setFieldValue,
                values: {
                  ...values,
                  [field.name]: valies
                },
                value: val,
                setErrors,
                isArrayType: true
              })
            } else {
              let thisValues = values[field.name]
              thisValues = thisValues.filter((el: any) => el !== e.target.value)
              setFieldValue(field.name, thisValues)
              const passingValues = { ...values, [field.name]: thisValues }
              arrayTypeDeSelectHandler(e.target.value, field.name, setFieldValue, passingValues)
            }
          }}
        />
        {children}
        <span />
      </label>
    </>
  )
}
