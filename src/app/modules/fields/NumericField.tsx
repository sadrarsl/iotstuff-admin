
import { Input as AntdInput } from 'antd'
import { useEffect, useState } from 'react'
import { fixNumbers } from '../form-generator/modules/form-generator/functions'

export default ({
  value,
  fieldChangeHandler,
  fieldProps
}: {
  value: number | undefined
  fieldChangeHandler: (value: number | undefined) => void
  fieldProps: object
}): JSX.Element => {
  const [fieldValue, setFieldValue] = useState<number | undefined>(undefined)

  function retainDigits(str: any) {
    return str.replace(/\D/g, '') // Use regular expression to replace non-digit characters with an empty string
  }

  useEffect(() => {
    fieldChangeHandler(fieldValue)
  }, [fieldValue])

  useEffect(() => {
    if (value && !fieldValue) {
      setFieldValue(value)
    } else if (!value) {
      setFieldValue(undefined)
    }
  }, [value])

  return (
    <>
      <AntdInput
        value={fieldValue}
        onChange={e => {
          if (e.target.value) {
            const newValue: any = e.target.value
            if (isNaN(fixNumbers(newValue))) {
              setFieldValue(retainDigits(newValue))
            } else {
              setFieldValue(+fixNumbers(newValue))
            }
          } else {
            setFieldValue(undefined)
          }
        }}
        {...fieldProps}
      />
    </>
  )
}
