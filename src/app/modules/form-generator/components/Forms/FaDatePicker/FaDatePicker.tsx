import React, { useEffect, useState } from 'react'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import DatePicker, { DayValue } from '@hassanmojab/react-modern-calendar-datepicker'
import {
  calculateMaximumDate,
  calculateMinimumDate,
  convertJalaliToGregorian,
  extractYearMonthDayFa,
  renderDatePickerCustomInput
} from '../../../modules/form-generator/functions'
import { useFormikContext } from 'formik'
import { FaDatePicker } from './_models'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
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
  maxDate,
  clock
}: FaDatePicker) => {
  const { setErrors, values, setFieldValue, errors }: any = useFormikContext()
  const [selectedDay, setSelectedDay] = useState<DayValue>(undefined)
  const [minimumDate, setMinimumDate] = useState<any>(undefined)
  const [maximumDate, setMaximumDate] = useState<any>(undefined)
  const [clockTime, setClockTime] = useState<any>()
  const [convertedClock, setConvertedClock] = useState<any>()

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
      setClockTime(moment(values[field.name]))
      const fetchedDate = extractYearMonthDayFa(new Date(values[field.name]))

      setSelectedDay({
        year: +fetchedDate.year,
        month: +fetchedDate.month,
        day: +fetchedDate.day
      })
    } else if (!values[field.name]) {
      setSelectedDay(undefined)
    }
  }, [values])

  const onChange = (date: any) => {
    if (date) {
      let finalDateValue = ''
      setSelectedDay(date)
      let clock

      if (clockTime) {
        const clocktime = new Date(clockTime?._d)
        const hour = clocktime.getHours()
        const minute = clocktime.getMinutes()
        clock = `${hour}:${minute}`
        setConvertedClock(`${hour}:${minute}`)
      }

      if (faDPmode === 'Georgian') {
        finalDateValue = convertJalaliToGregorian(`${date.year}/${date.month}/${date.day}`)
      } else if (faDPmode === 'Jalalli') {
        finalDateValue = `${date.year}/${date.month}/${date.day}`
      }
      fieldsChangeHandler({
        name: field.name,
        setFieldValue,
        values: {
          ...values,
          [field.name]: `${finalDateValue}${clock ? ` ${clock}` : ''}`
        },
        value: `${finalDateValue}${clock ? ` ${clock}` : ''}`,
        setErrors
      })
    }
  }

  useEffect(() => {
    onChange(selectedDay)
  }, [clockTime])

  return (
    <>
      <DatePicker
        value={selectedDay && selectedDay}
        onChange={onChange}
        shouldHighlightWeekends
        wrapperClassName={className && className}
        renderFooter={() => {
          if (clock) {
            return (
              <div style={{ height: '2rem' }} className='col-12 w-100'>
                <TimePicker
                  className='w-100 text-center'
                  defaultValue={moment()}
                  placeholder='انتخاب ساعت'
                  showSecond={false}
                  value={clockTime}
                  onChange={setClockTime}
                />
              </div>
            )
          }

          return <></>
        }}
        locale='fa' // add this
        calendarPopperPosition='bottom'
        renderInput={({ ref }) =>
          renderDatePickerCustomInput({
            ref,
            placeholder,
            className,
            value:
              selectedDay &&
              `${selectedDay.year}/${selectedDay.month}/${selectedDay.day} ${convertedClock ? convertedClock : ''}`,
            disabled: disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false,
            error: errors[field.name] ? true : false
          })
        }
        minimumDate={minimumDate && minimumDate}
        maximumDate={maximumDate && maximumDate}
      />
      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
    </>
  )
}
