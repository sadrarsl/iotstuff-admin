import { DatePicker, Typography } from 'antd'
import { useFormikContext } from 'formik'
import { EnDatePickerModel } from './_models'
import dayjs from 'dayjs'

export function EnDateDatePicker({
  field,
  className,
  fieldsChangeHandler,
  errMessageType,
  disabled,
  disabledTime,
  format,
  onOk,
  onPanelChange,
  renderExtraFooter,
  showNow,
  showToday,
  placeholder
}: EnDatePickerModel): JSX.Element {
  const { values, errors, setErrors, setFieldValue }: any = useFormikContext()

  return (
    <>
      <DatePicker
        onChange={(e: any, a: any) => {
          fieldsChangeHandler({
            name: field.name,
            setFieldValue,
            values: { ...values, [field.name]: a },
            value: a,
            setErrors
          })
        }}
        disabled={disabled && typeof disabled === 'function' ? disabled(values) : disabled}
        disabledTime={disabledTime}
        format={format}
        onOk={onOk}
        onPanelChange={onPanelChange}
        placeholder={placeholder && placeholder}
        renderExtraFooter={renderExtraFooter}
        showNow={showNow}
        showToday={showToday}
        value={values[field.name] && dayjs(values[field.name])}
      />

      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
    </>
  )
}
