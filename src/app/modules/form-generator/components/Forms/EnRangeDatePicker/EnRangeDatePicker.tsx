import { DatePicker, Typography } from 'antd'
import { useFormikContext } from 'formik'
import dayjs from 'dayjs'
import { EnRangeDatePickerModel } from './_models'

const { RangePicker } = DatePicker

dayjs.locale('en')

export function EnRangeDatePicker({
  field,
  className,
  fieldsChangeHandler,
  errMessageType,
  disabled,
  format,
  renderExtraFooter
}: EnRangeDatePickerModel): JSX.Element {
  const { values, errors, setErrors, setFieldValue }: any = useFormikContext()
  const dateFormat = 'YYYY-MM-DD'

  return (
    <>
      <RangePicker
        onChange={(e: any, a: any) => {
          fieldsChangeHandler({
            name: field.name,
            setFieldValue,
            values: {
              ...values,
              [field.name]: a
            },
            value: a,
            setErrors
          })
        }}
        disabled={disabled && typeof disabled === 'function' ? disabled(values) : disabled}
        format={format}
        renderExtraFooter={renderExtraFooter}
        value={
          values[field.name] && [
            values[field.name][0] && dayjs(values[field.name][0], dateFormat),
            values[field.name][1] && dayjs(values[field.name][1], dateFormat)
          ]
        }
      />

      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
    </>
  )
}
