import moment from 'moment'
import jMoment from 'jalali-moment'
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox'
import CustomCheckboxGroup from '../../components/CustomCheckboxGroup/CustomCheckboxGroup'
import CustomImageUpload from '../../components/CustomImageUpload/CustomImageUpload'
import CustomMultiSelect from '../../components/CustomMultiSelect/CustomMultiSelect'
import CustomNumericFIeld from '../../components/CustomNumericField/CustomNumericFIeld'
import CustomRadioGroup from '../../components/CustomRadioGroup/CustomRadioGroup'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import CustomTextFIeld from '../../components/CustomTextField/CustomTextFIeld'
import CustomUploadZone from '../../components/CustomUploadZone/CustomUploadZone'

import {
  Field,
  FieldChangeHandler,
  LoadingState,
  OptionsState,
  Relation,
  RelationState,
  ValueValidationObject
} from './_models'
import { Input } from 'antd'
import CustomFaDatePicker from '../../components/CustomFaDatePicker/CustomFaDatePicker'
import CustomFaRangeDatePicker from '../../components/CustomFaRangeDatePicker/CustomFaRangeDatePicker'
import { FieldsType } from '../Core/_types'
import { _Field } from '../Core/_models'
import CustomEnDatePicker from '../../components/CustomEnDatePicker/CustomEnDatePicker'
import CustomEnRangeDatePicker from '../../components/CustomEnRangeDatePicker/CustomEnRangeDatePicker'

export const renderDatePickerCustomInput = ({
  ref,
  value,
  className = '',
  placeholder,
  disabled,
  error
}: any): JSX.Element => (
  <Input
    readOnly
    status={error ? 'error' : ''}
    disabled={disabled}
    ref={ref} // necessary
    placeholder={placeholder && placeholder}
    value={value || ''}
    className={className} // a styling class
  />
)

export const convertJalaliToGregorian = (jalaliDateString: string): string => {
  const jDate = jMoment(jalaliDateString, 'jYYYY/jMM/jDD')
  const gDate = jDate.toDate()

  return moment(gDate).format('YYYY-MM-DD') // You can customize the output format
}

export const arrayValueFields: string[] = ['multiselect', 'checkboxgroup', 'radio']

export const validFieldsForOptionRelation: string[] = ['select', 'multiselect', 'checkboxgroup', 'radio']

export const valueValidationObject: ValueValidationObject = {
  select: ['select', 'radio', 'textfield'],
  multiselect: [],
  textfield: ['textfield'],
  checkbox: ['checkbox'],
  checkboxgroup: [],
  radio: ['radio', 'checkbox', 'textfield']
}

export const FieldsGenerator = (
  Field: any,
  fieldsChangeHandler: (params: FieldChangeHandler) => Promise<void>,
  optionsState: OptionsState,
  loadingState: LoadingState,
  errMessageType: string,
  setFieldValue: any,
  arrayTypeDeSelectHandler: any,
  filesChangeHandler: any,
  values: any,
  errors: any,
  setErrors: any,
  optionalFieldDeleteAllHandler: any,
  formikProps: any
) => {
  const type: FieldsType = Field.type
  if (type) {
    if (type === 'TextField') {
      return (
        <CustomTextFIeld
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
        />
      )
    } else if (type === 'FaDatePicker') {
      return (
        <CustomFaDatePicker
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
        />
      )
    } else if (type === 'FaRangeDatePicker') {
      return (
        <CustomFaRangeDatePicker
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
        />
      )
    } else if (type === 'NumericField') {
      return (
        <CustomNumericFIeld
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
        />
      )
    } else if (type === 'ImageUpload') {
      return (
        <CustomImageUpload
          {...Field}
          filesChangeHandler={filesChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
        />
      )
    } else if (type === 'UploadZone') {
      return (
        <CustomUploadZone
          {...Field}
          filesChangeHandler={filesChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
        />
      )
    } else if (type === 'CheckBox') {
      return (
        <CustomCheckbox
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          errMessageType={errMessageType}
          loadingState={loadingState}
        />
      )
    } else if (type === 'CheckBoxGroup') {
      //   [
      //     "type",
      //     "label",
      //     "name",
      //     "placeholder",
      //     "className",
      //     "parentClassName",
      //     "options"
      // ]

      return (
        <CustomCheckboxGroup
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
          arrayTypeDeSelectHandler={arrayTypeDeSelectHandler}
          optionalFieldDeleteAllHandler={optionalFieldDeleteAllHandler}
        />
      )
    } else if (type === 'Select') {
      return (
        <CustomSelect
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
          setFieldValue={setFieldValue}
        />
      )
    } else if (type === 'MultiSelect') {
      return (
        <CustomMultiSelect
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          loadingState={loadingState}
          errMessageType={errMessageType}
          arrayTypeDeSelectHandler={arrayTypeDeSelectHandler}
          optionalFieldDeleteAllHandler={optionalFieldDeleteAllHandler}
        />
      )
    } else if (type === 'Radio') {
      return (
        <CustomRadioGroup
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          optionsState={optionsState}
          errMessageType={errMessageType}
          loadingState={loadingState}
        />
      )
    } else if (type === 'EnDatePicker') {
      return (
        <CustomEnDatePicker
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          errMessageType={errMessageType}
          loadingState={loadingState}
        />
      )
    } else if (type === 'EnRangeDatePicker') {
      return (
        <CustomEnRangeDatePicker
          {...Field}
          fieldsChangeHandler={fieldsChangeHandler}
          errMessageType={errMessageType}
          loadingState={loadingState}
        />
      )
    } else if (type === 'CustomComponent') {
      const CustomCompoent = Field.component

      return (
        <CustomCompoent
          optionsState={optionsState}
          errMessageType={errMessageType}
          loadingState={loadingState}
          fieldsChangeHandler={fieldsChangeHandler}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
          setErrors={setErrors}
          name={Field.name}
          {...formikProps}
        />
      )
    } else {
      new Error(`${Field.name}'s Type Is Incorrect.`)
    }
  } else {
    new Error(`Cannot Find ${Field.name} Type.`)
  }
}

export const GeneratePropsForValidation = (FieldsArray: Field[]) => {
  const generateValidationFormat: any[] = FieldsArray.map(el => {
    const payload = { type: el.type, props: { ...el } }

    return payload
  })

  return generateValidationFormat
}

export const isRelationAlreadyParent = (relation: Relation, relations: RelationState[]): boolean => {
  // Cheking Passed Inited Relations State=relations:RelationState[] If Passed Subject Relation=relation:Relation Is Parent

  const isRelationAlreadyParent: boolean = relations.find(
    (stateRelation: RelationState) =>
      stateRelation.name.toLowerCase() === relation.parent.toLowerCase() &&
      stateRelation.type.toLowerCase() === relation.type.toLowerCase()
  )
    ? true
    : false

  return isRelationAlreadyParent
}

export const stringSubjectEqualness = (subject: string, equalTo: string): boolean => {
  const lowerCasedSubject: string = subject.toLowerCase()
  const lowerCasedEqualTo: string = equalTo.toLowerCase()
  const isEqual: boolean = lowerCasedSubject === lowerCasedEqualTo

  return isEqual
}

export const findElementIndexInArray = (
  array: any[],
  passedElement: any,
  compareFn: ({ arrayElement, passedElement }: any) => boolean
): number => {
  return array.findIndex(arrayElement => compareFn({ arrayElement, passedElement }))
}

export const fieldInitValueGenerator = (name: string, fields: _Field<FieldsType>[]): any => {
  // Generating Field Init Value When Parent Cleared Or ...
  const field: _Field<FieldsType> | undefined = fields.find(le => le.name === name)
  if (field && field.type !== 'CustomComponent') {
    const type = field.type.toLowerCase()
    if (type === 'select') {
      return null
    } else if (type === 'multiselect') {
      return []
    } else if (type === 'textfield') {
      return ''
    } else if (type === 'numericfield') {
      return null
    } else if (type === 'checkbox') {
      return false
    } else if (type === 'checkboxgroup') {
      return []
    } else if (type === 'radio') {
      return false
    } else if (type === 'fadatepicker') {
      return null
    } else if (type === 'farangedatepicker') {
      return null
    }
  }
}

export const removeDuplicatesByProperty = (array: any[], property: any) => {
  return array.filter((obj, index, self) => index === self.findIndex(o => o[property] === obj[property]))
}

export const calculateMaximumDate = ({ period, amount }: { period: string; amount: number }) => {
  const currentDate = new Date() // Get the current date

  let maxDate

  switch (period) {
    case 'year':
      maxDate = new Date(currentDate.getFullYear() + amount, 11, 31) // Maximum date for the current year
      break
    case 'month':
      maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + amount + 1, 0) // Maximum date for the current month
      break
    case 'week':
      maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7 * amount) // Maximum date for the current week
      break
    case 'day':
      maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + amount) // Maximum date for the current day
      break
    default:
      break
  }

  return maxDate
}

export const calculateMinimumDate = ({ period, amount }: { period: string; amount: number }) => {
  const currentDate = new Date() // Get the current date

  let minDate

  switch (period) {
    case 'year':
      minDate = new Date(currentDate.getFullYear() - amount, 0, 1)
      break
    case 'month':
      minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - amount, 1)
      break
    case 'week':
      minDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 7 * amount - currentDate.getDay()
      )
      break
    case 'day':
      minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - amount)
      break
    default:
      break
  }

  return minDate
}

export const extractYearMonthDayFa = (date: string | Date) => {
  const date_coz = jMoment(new Date(date))

  const year = +date_coz.format('jYYYY')
  const month = +date_coz.format('jM')
  const day = +date_coz.format('jD')

  return { year, month, day }
}

export const getBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]

export const fixNumbers = (str: any) => {
  for (let i = 0; i < 10; i++) {
    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
  }

  return str
}
