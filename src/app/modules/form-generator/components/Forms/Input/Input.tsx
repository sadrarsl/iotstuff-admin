import { useFormikContext } from 'formik'
import { Input } from './_models'
import { Spin, Input as AntdInput, Typography } from 'antd'
import { fixNumbers } from '../../../modules/form-generator/functions'

export default ({
  field, // { name, value, onChange, onBlur }
  fieldsChangeHandler,
  className,
  errMessageType,
  loadingState,
  disabled,
  direction,
  addonAfter,
  addonBefore,
  allowClear,
  bordered,
  count,
  defaultValue,
  maxLength,
  onPressEnter,
  prefix,
  showCount,
  status,
  suffix,
  size,
  placeholder,
  textType
}: Input): JSX.Element => {
  const { values, setFieldValue, setErrors, errors }: any = useFormikContext()

  return (
    <>
      <Spin spinning={loadingState && loadingState[field.name] ? true : false}>
        <AntdInput
          className={className}
          value={values[field.name] && values[field.name]}
          dir={direction && direction}
          addonAfter={addonAfter && addonAfter}
          addonBefore={addonBefore && addonBefore}
          allowClear={allowClear && allowClear}
          bordered={bordered && bordered}
          count={count && count}
          defaultValue={defaultValue && defaultValue}
          maxLength={maxLength && maxLength}
          onPressEnter={onPressEnter && onPressEnter}
          prefix={prefix && prefix}
          showCount={showCount && showCount}
          suffix={suffix && suffix}
          size={size && size}
          placeholder={placeholder && placeholder}
          type={textType && textType}
          disabled={disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false}
          status={status || errors[field.name] ? 'error' : ''}
          onChange={e => {
            fieldsChangeHandler({
              name: field.name,
              setFieldValue,
              values: {
                ...values,
                [field.name]: fixNumbers(e.target.value)
              },
              setErrors,
              value: fixNumbers(e.target.value)
            })
          }}
        />
      </Spin>
      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
    </>
  )
}
