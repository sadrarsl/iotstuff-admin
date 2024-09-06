import { useDebouncedCallback } from 'use-debounce'
import { _Field } from '../form-generator/modules/Core/_models'
import TextArea from './TextArea'

export const srpba_css_template = () => ({
  parentClassName: 'col-12 col-md-4 p-1',
  className: 'w-100',
  lableClassName: 'labelz mb-2'
})

// Generate FormBuilder's TextField
export const create_text_field_attrs = (
  name: string,
  direction: 'rtl' | 'ltr',
  label: string,
  extraProps?: Omit<_Field<'TextField'>, 'type' | 'name' | 'direction' | 'label'>
): _Field<'TextField'> => {
  const text_field_props: _Field<'TextField'> = {
    name,
    type: 'TextField',
    direction,
    label,
    allowClear: true,

    ...extraProps
  }

  return text_field_props
}

// Generate FormBuilder's NumericField

export const create_numeric_field_attrs = (
  name: string,
  label: string,
  extraProps?: Omit<_Field<'NumericField'>, 'type' | 'name' | 'direction' | 'label'>
): _Field<'NumericField'> => {
  const numeric_field_props: _Field<'NumericField'> = {
    name,
    type: 'NumericField',
    direction: 'ltr',
    label,
    allowClear: true,

    ...extraProps
  }

  return numeric_field_props
}

// Generate FormBuilder's Offline Select

export const create_offine_select = (
  name: string,
  direction: 'ltr' | 'rtl',
  label: string,
  extraProps?: Omit<
    _Field<'Select'>,
    'type' | 'name' | 'direction' | 'label' | 'filterOption' | 'showSearch' | 'optionFilterProp'
  >
): _Field<'Select'> => {
  const offline_select_props: _Field<'Select'> = {
    name,
    type: 'Select',
    direction,
    label,
    filterOption: (input, option) => {
      return (
        option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    showSearch: true,
    optionFilterProp: 'children',
    allowClear: true,

    ...extraProps
  }

  return offline_select_props
}

// Generate FormBuilder's Offline MultiSelect

export const create_offine_multiselect = (
  name: string,
  direction: 'ltr' | 'rtl',
  label: string,
  extraProps?: Omit<
    _Field<'MultiSelect'>,
    'type' | 'name' | 'direction' | 'label' | 'filterOption' | 'showSearch' | 'optionFilterProp'
  >
): _Field<'MultiSelect'> => {
  const offline_multiselect_props: _Field<'MultiSelect'> = {
    name,
    type: 'MultiSelect',
    direction,
    label,
    filterOption: (input, option) => {
      return (
        option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    showSearch: true,
    optionFilterProp: 'children',
    allowClear: true,
    ...extraProps
  }

  return offline_multiselect_props
}

// Generate FormBuilder's Online Select

export const create_online_select = (
  name: string,
  onSearch: (value: string) => void,
  direction: 'ltr' | 'rtl',
  label: string,
  extraProps?: Omit<
    _Field<'Select'>,
    'type' | 'name' | 'direction' | 'label' | 'filterOption' | 'showSearch' | 'optionFilterProp' | 'onSearch'
  >
): _Field<'Select'> => {
  const online_select_props: _Field<'Select'> = {
    name,
    type: 'Select',
    direction,
    label,
    onSearch: useDebouncedCallback(value => {
      onSearch(value)
    }, 500),
    filterOption: false,
    showSearch: true,
    allowClear: true,
    onClear: () => onSearch(''),
    ...extraProps
  }

  return online_select_props
}

// Generate FormBuilder's Online MultiSelect

export const create_online_multiselect = (
  name: string,
  onSearch: (value: string) => void,
  direction: 'ltr' | 'rtl',
  label: string,
  extraProps?: Omit<
    _Field<'MultiSelect'>,
    'type' | 'name' | 'direction' | 'label' | 'filterOption' | 'showSearch' | 'optionFilterProp' | 'onSearch'
  >
): _Field<'MultiSelect'> => {
  const online_multiselect_props: _Field<'MultiSelect'> = {
    name,
    type: 'MultiSelect',
    direction,
    label,
    onSearch: useDebouncedCallback(value => {
      onSearch(value)
    }, 500),
    filterOption: false,
    showSearch: true,
    allowClear: true,
    ...extraProps
  }

  return online_multiselect_props
}

// Generate FormBuilder's Jalali Datepicker
export const create_jalali_to_georgian_datepicker = (
  name: string,
  label: string,
  extraProps?: Omit<_Field<'FaDatePicker'>, 'type' | 'name' | 'label' | 'faDPmode'>
): _Field<'FaDatePicker'> => {
  const faDatePicker_props: _Field<'FaDatePicker'> = {
    faDPmode: 'Georgian',
    label,
    name,
    type: 'FaDatePicker',
    ...extraProps
  }
  return faDatePicker_props
}

// Generate FormBuilder's TextArea
export const create_text_area = (
  name: string,
  label: string,
  extraProps: object,
  parentClassName: string
): _Field<'CustomComponent'> => {
  const description: _Field<'CustomComponent'> = {
    component: props => (
      <TextArea
        parentClassName={parentClassName}
        extraProps={extraProps}
        {...props}
        onChange={(value, props) => {
          const { setFieldValue } = props

          setFieldValue(name, value)
        }}
        valueFunction={values => (values[name] ? values[name] : null)}
        label={label}
        labelClassName={''}
      />
    ),
    name: 'CustomComponent',
    type: 'CustomComponent'
  }

  return description
}
