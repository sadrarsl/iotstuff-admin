import React, { useEffect, useState } from 'react'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker'
import {
  calculateMaximumDate,
  calculateMinimumDate,
  convertJalaliToGregorian,
  extractYearMonthDayFa,
  renderDatePickerCustomInput
} from '../../../modules/form-generator/functions'
import { useFormikContext } from 'formik'
import { FaRangeDatePicker } from './_models'
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker'
import { Typography } from 'antd'

export default ({
  field,
  className,
  fieldsChangeHandler,
  errMessageType,
  disabled,
  faDPmode,
  placeholder,
  minDate,
  maxDate
}: FaRangeDatePicker): JSX.Element => {
  const { setErrors, values, setFieldValue, errors }: any = useFormikContext()
  const [selectedDay, setSelectedDay] = useState<DayRange>({
    from: null,
    to: null
  })
  const [minimumDate, setMinimumDate] = useState<any>(null)
  const [maximumDate, setMaximumDate] = useState<any>(null)

  useEffect(() => {
    const minDateCopied: any = minDate
    if (minDateCopied) {
      if (minDateCopied.value.period && minDateCopied.value.amount) {
        const minDateStR = calculateMinimumDate({
          period: minDateCopied.value.period,
          amount: minDateCopied.value.amount
        })
        if (minDateStR) {
          const minDateObj = extractYearMonthDayFa(minDateStR)

          setMinimumDate(minDateObj)
        }
      } else {
        setMinimumDate(minDateCopied)
      }
    }

    const maxDateCopy: any = maxDate

    if (maxDateCopy) {
      if (maxDateCopy.value.period && maxDateCopy.value.amount) {
        const maxDateStR = calculateMaximumDate({
          period: maxDateCopy.value.period,
          amount: maxDateCopy.value.amount
        })

        if (maxDateStR) {
          const maxDateObj = extractYearMonthDayFa(maxDateStR)

          setMaximumDate(maxDateObj)
        }
      } else {
        setMaximumDate(maxDateCopy)
      }
    }
  }, [minDate, maxDate])

  useEffect(() => {
    if (values[field.name] && !selectedDay) {
      if (!values[field.name].from && !values[field.name].to) {
        throw new Error('Specified Type For Fa Range DatePicker is {from:date,to:date}')
      }
      const fetchedDateObject: any = { from: null, to: null }
      fetchedDateObject.from = new Date(values[field.name].from)
      if (values[field.name].to) {
        fetchedDateObject.to = new Date(values[field.name].to).toLocaleString('fa-IR').split('-')
      }

      setSelectedDay(fetchedDateObject)
    } else if (!values[field.name]) {
      setSelectedDay({
        from: null,
        to: null
      })
    }
  }, [values])

  const onChange = (date: DayRange) => {
    setSelectedDay(date)
    const finalDateValue: any = { from: null, to: null }
    if (faDPmode === 'Georgian') {
      if (date.from) {
        finalDateValue.from = convertJalaliToGregorian(`${date.from.year}/${date.from.month}/${date.from.day}`)
      }
      if (date.to) {
        finalDateValue.to = convertJalaliToGregorian(`${date.to.year}/${date.to.month}/${date.to.day}`)
      }
    } else if (faDPmode === 'Jalalli') {
      if (date.from) {
        finalDateValue.from = `${date.from.year}/${date.from.month}/${date.from.day}`
      }
      if (date.to) {
        finalDateValue.to = `${date.to.year}/${date.to.month}/${date.to.day}`
      }
    }
    fieldsChangeHandler({
      name: field.name,
      setFieldValue,
      values: { ...values, [field.name]: finalDateValue },
      value: finalDateValue,
      setErrors
    })
  }

  return (
    <>
      <DatePicker
        value={selectedDay}
        onChange={onChange}
        shouldHighlightWeekends
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        locale='fa' // add this
        renderInput={({ ref }) =>
          renderDatePickerCustomInput({
            ref,
            placeholder,
            className,
            value:
              !selectedDay?.from && !selectedDay?.to
                ? ''
                : `از ${selectedDay?.from && selectedDay?.from?.year}/${
                    selectedDay?.from && selectedDay?.from?.month
                  }/${selectedDay?.from && selectedDay?.from?.day} تا ${selectedDay?.to && selectedDay?.to?.year}/${
                    selectedDay?.to && selectedDay?.to?.month
                  }/${selectedDay?.to && selectedDay?.to?.day}`,
            disabled: disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false
          })
        }
      />
      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
    </>
  )
}
