import { Input } from 'antd'
import { ReactNode } from 'react'

const { TextArea } = Input

export default (props: any): JSX.Element => {
  const { parentClassName, extraProps, onChange, valueFunction, label, labelClassName, values } = props

  return (
    <div className={parentClassName}>
      {label && <label className={labelClassName}>{label}</label>}
      <TextArea
        showCount
        value={valueFunction(values)}
        onChange={e => onChange(e.target.value, props)}
        {...extraProps}
      />
    </div>
  )
}
