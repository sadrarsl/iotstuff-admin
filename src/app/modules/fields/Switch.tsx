import { Switch } from 'antd'

export default (props: any) => {
  const {
    values,
    parentClassName,
    switchClassname,
    switchValueFunction,
    labelClassName,
    label,
    injectProps,
    handleMyChange
  } = props

  return (
    <div className={parentClassName}>
      <label className={labelClassName}>{label}</label>
      <Switch
        className={switchClassname}
        checked={switchValueFunction(values) as boolean}
        onChange={(e: any) => handleMyChange(e, props)}
        {...injectProps}
      />
    </div>
  )
}
