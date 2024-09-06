import React, { useEffect, useState } from 'react'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import DatePicker, { DayValue } from '@hassanmojab/react-modern-calendar-datepicker'
import { useFormikContext } from 'formik'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import {
  convertJalaliToGregorian,
  extractYearMonthDayFa,
  renderDatePickerCustomInput
} from '../form-generator/modules/form-generator/functions'

type FaDatePicker = {
  value: string | undefined
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

export default ({ value, onChange, className, placeholder }: FaDatePicker) => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(undefined)

  const convertValueToDayValue = (date: string): DayValue => {
    const fetchedDate = extractYearMonthDayFa(new Date(date))

    setSelectedDay({
      year: +fetchedDate.year,
      month: +fetchedDate.month,
      day: +fetchedDate.day
    })

    return {
      year: +fetchedDate.year,
      month: +fetchedDate.month,
      day: +fetchedDate.day
    }
  }

  return (
    <>
      <DatePicker
        value={value ? convertValueToDayValue(value) : undefined}
        onChange={(date: DayValue) => {
          const georgianDate = convertJalaliToGregorian(`${date?.year}/${date?.month}/${date?.day}`)
          onChange(georgianDate)
        }}
        shouldHighlightWeekends
        wrapperClassName={className && className}
        locale='fa' // add this
        calendarPopperPosition='bottom'
        renderInput={({ ref }) =>
          renderDatePickerCustomInput({
            ref,
            placeholder,
            className,
            value: selectedDay && `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`
          })
        }
      />
    </>
  )
}
