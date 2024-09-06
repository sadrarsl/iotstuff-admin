import { SearchOutlined } from '@ant-design/icons'
import { Input, Select, Switch } from 'antd'
import { AxiosResponse } from 'axios'
import { ReactNode } from 'react'
import type { TableColumnType } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import NumericField from './fields/NumericField'
import FaDatePicker from './fields/FaDatePicker'

const { Option } = Select

export type T_search_fields = 'Input' | 'Select' | 'MultiSelect' | 'Switch' | 'NumericInput' | 'FaDatePicker'

/* Below Function Recieve api_result and id key(VALUE_KEY) and label key(LABEL_KEY) and optionsSetter and field_name 
then generate field's options based on these params and set via optionsSetter  */

export const fetcher = (
  api_result: AxiosResponse | void,
  options: Record<string, any[]>,
  optionsSetter: React.Dispatch<React.SetStateAction<Record<string, any[]>>>,
  keepSelected: boolean,
  VALUE_KEY: string,
  LABEL_KEY: string | string[],
  field_name: string
): void => {
  if (api_result && api_result?.data?.rows) {
    const data = api_result?.data?.rows
    const convertedData = data.map((el: any) => {
      el['opt_value'] = el[VALUE_KEY]
      if (typeof LABEL_KEY === 'string') {
        el['opt_label'] = el[LABEL_KEY]
      } else {
        let label = ''
        LABEL_KEY.forEach((lab: string) => {
          label = `${label} ${el[lab]}`
        })
        el['opt_label'] = label
      }

      return el
    })
    if (keepSelected) {
      optionsSetter(opts => {
        const field_options: any[] | undefined = opts[field_name]
        const selectedOptions: any[] | undefined = field_options?.filter(el => el.selected === true)
        if (selectedOptions) {
          return { ...opts, [field_name]: [...selectedOptions, ...convertedData] }
        } else {
          return { ...opts, [field_name]: convertedData }
        }
      })
    } else {
      optionsSetter(opts => {
        return { ...opts, [field_name]: convertedData }
      })
    }
  } else {
    optionsSetter(opts => ({ ...opts, [field_name]: [] }))
  }
}

/* 
  Below Function Trigger On Multi Optional Fields Change And Mark That Record In Options Via OptionsSetter That Passed To Function
  For When Client Searched In Field For New Options Selected Record Stay And Don't Disturb Selected Label
*/

export const setter = (
  options: Record<string, any[]>,
  optionsSetter: React.Dispatch<React.SetStateAction<Record<string, any[]>>>,
  value: string | any[],
  field_name: string
): void => {
  optionsSetter((opts: Record<string, any[]>): any => {
    const field_options: any[] | undefined = opts[field_name]
    if (field_options && field_options.length !== 0) {
      if (typeof value === 'string' || typeof value === 'number') {
        const options_index = field_options.findIndex(el => el['opt_value'] === value)
        field_options.forEach(el => {
          el.selected = false
        })
        if (field_options[options_index]) {
          field_options[options_index]['selected'] = true
        }

        return { ...opts, [field_name]: field_options }
      } else if (typeof value === 'object') {
        field_options.forEach(el => {
          el.selected = false
        })
        value.forEach((val: any) => {
          const options_index = field_options.findIndex(el => el['opt_value'] === val)
          field_options[options_index]['selected'] = true
        })
        return { ...opts, [field_name]: field_options }
      }
    } else {
      return opts
    }
  })
}

/* Below Function Generate Search Fields Based On Passed Params  */

export const search_fields = (
  type: T_search_fields,
  value: any,
  changeHandler: (value: any) => void,
  searchHandler?: (value: any) => void,
  extraProps?: object,
  options?: any[]
): ReactNode | JSX.Element => {
  if (type === 'Input') {
    return <Input value={value} onChange={e => changeHandler(e)} {...extraProps} />
  } else if (type === 'NumericInput') {
    return <NumericField fieldChangeHandler={e => changeHandler(e)} fieldProps={extraProps || {}} value={value} />
  } else if (type === 'MultiSelect') {
    return (
      <Select
        mode='multiple'
        notFoundContent='داده موردنظر دریافت نشد'
        value={value || []}
        onChange={e => changeHandler(e)}
        onClear={() => {
          changeHandler([])
        }}
        {...extraProps}
        style={{ width: '100%' }}
        allowClear={true}
        autoClearSearchValue={false}
        onDropdownVisibleChange={open => {
          if (searchHandler && !open) {
            searchHandler(null)
          }
        }}
        onSearch={e => {
          if (searchHandler) {
            searchHandler(e)
          }
        }}
        filterOption={searchHandler ? false : true}
        showSearch={true}
      >
        {options &&
          options.map((el: any, idx: number) => {
            return (
              <Option key={idx} value={el['opt_value']}>
                {el['opt_label']}
              </Option>
            )
          })}
      </Select>
    )
  } else if (type === 'Select') {
    return (
      <Select
        {...extraProps}
        notFoundContent='داده موردنظر دریافت نشد'
        value={value || []}
        onChange={e => changeHandler(e)}
        onClear={() => {
          changeHandler([])
        }}
        style={{ width: '100%' }}
        allowClear={true}
        autoClearSearchValue={false}
        onSearch={e => {
          if (searchHandler) {
            searchHandler(e)
          }
        }}
        filterOption={searchHandler ? false : true}
        showSearch={true}
      >
        {options &&
          options.map((el: any, idx: number) => {
            return (
              <Option key={idx} value={el['opt_value']}>
                {el['opt_label']}
              </Option>
            )
          })}
      </Select>
    )
  } else if (type === 'Switch') {
    return (
      <Switch
        {...extraProps}
        checked={value}
        onChange={e => {
          changeHandler(e)
        }}
      />
    )
  } else if (type === 'FaDatePicker') {
    return <FaDatePicker onChange={e => changeHandler(e)} value={value} {...extraProps} />
  }
}

/* Below Function Generate Column's Search Popup */
export const get_column_search_props = <T extends object>(
  type: T_search_fields,
  value: any,
  changeHandler: (value: any) => void,
  searchHandler?: (value: any) => void,
  extraProps?: object,
  options?: any[]
): TableColumnType<T> => {
  return {
    filterDropdown: props => {
      const { close } = props

      return (
        <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
          <div className='col-12'>
            <FontAwesomeIcon icon={faTimes} style={{ fontSize: 14, cursor: 'pointer' }} onClick={() => close()} />
          </div>
          {search_fields(
            type,
            value,
            type === 'Select'
              ? e => {
                  changeHandler(e)
                  close()
                }
              : changeHandler,
            searchHandler,
            extraProps,
            options
          )}
        </div>
      )
    },
    filterIcon: (
      <SearchOutlined
        style={{
          color:
            typeof value === 'object' ? (value.length !== 0 ? '#1677ff' : undefined) : value ? '#1677ff' : undefined
        }}
      />
    )
  }
}

// Below Function Extract Value From Nested Object And IF Did not Exist Return undefined
const nested_extractor = (data: any, keys: string[]) => {
  if (keys.length === 0) {
    return data
  } else {
    const newData = data[keys[0]]
    if (typeof newData === 'undefined') {
      return undefined
    } else {
      keys.shift()
      return nested_extractor(newData, keys)
    }
  }
}

/* Below Function Is For Object With Related Structure Recieve Data And Extract It By willExtracted Structure */

export const related_data_extractor = async ({
  data,
  willExtracted
}: {
  data: any
  willExtracted: Record<string, string[]>
}) => {
  if (data) {
    const keys = Object.keys(willExtracted)
    const convertedData: any = []
    await data.forEach((element: any) => {
      const returnObject: any = {}
      keys.forEach((we: string) => {
        const keyzValues = willExtracted[we]
        let value:any = ''
        keyzValues.forEach(kv => {
          const isSpace: boolean = kv.trim() === '' ? true : false
          const isNested: boolean = kv.includes('.') ? true : false
          if (isSpace) {
            if (value) {
              value = value + kv
            } else {
              value = kv
            }
          } else if (isNested) {
            const nestedData = nested_extractor(element, kv.split('.'))
            if (value) {
              value = value + nestedData
            } else {
              value = nestedData
            }
          } else {
            if (element[kv]) {
              if (value) {
                value = value + element[kv]
              } else {
                value = element[kv]
              }
            } else {
              if (value) {
                value = value + undefined
              } else {
                value = undefined
              }
            }
          }
        })
        returnObject[we] = value
      })
      convertedData.push(returnObject)
    })
    return convertedData
  } else {
    return false
  }
}
