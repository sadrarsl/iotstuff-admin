import React from 'react'
import { CustomNumericField } from './_models'
import { Field } from 'formik'
import NumericInput from '../Forms/NumericInput/NumericInput'
import { Typography } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  placeholder,
  className,
  testAttr,
  lableClassName,
  errMessageType,
  disabled,
  fieldsChangeHandler,
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
  size,
  status,
  suffix
}: CustomNumericField) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}
      <Field
        name={name && name}
        component={NumericInput}
        className={className}
        placeholder={placeholder && placeholder}
        testAttr={testAttr || ''}
        errMessageType={errMessageType}
        disabled={disabled}
        fieldsChangeHandler={fieldsChangeHandler}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        allowClear={allowClear}
        bordered={bordered}
        count={count}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onPressEnter={onPressEnter}
        prefix={prefix}
        showCount={showCount}
        size={size}
        status={status}
        suffix={suffix}

        // disabled={
        //   disabledState && disabledState[name] ? disabledState[name] : false
        // }
      />
      {/* {errors && errors[name] && (
        <div className="text-danger mt-2">{errors[name]}</div>
      )} */}
    </div>
  )
}
