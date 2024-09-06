export interface FormikField {
  name: string
  checked?: boolean
  onBlur: () => void
  onChange: (e: React.ChangeEvent<any>) => void
  value: any
  multiple?: boolean
}

export interface FieldsFormikProps {
  field: FormikField
  form: any
}
