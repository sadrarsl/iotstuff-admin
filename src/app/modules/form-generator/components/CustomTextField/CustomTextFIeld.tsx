import React from 'react'
import { CustomTextField } from './_models'
import { Field } from 'formik'
import Input from '../Forms/Input/Input'
import { Typography } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  placeholder,
  className,
  testAttr,
  lableClassName,
  fieldsChangeHandler,
  loadingState,
  errMessageType,
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
  suffix,
  status,
  size,
  showCount,
  type,
  textType
}: CustomTextField) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}
      <Field
        name={name && name}
        component={Input}
        className={className}
        placeholder={placeholder && placeholder}
        errMessageType={errMessageType}
        testAttr={testAttr || ''}
        fieldsChangeHandler={fieldsChangeHandler}
        loadingState={loadingState}
        disabled={disabled}
        direction={direction}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        allowClear={allowClear}
        bordered={bordered}
        count={count}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onPressEnter={onPressEnter}
        prefix={prefix}
        suffix={suffix}
        status={status}
        size={size}
        type={type}
        showCount={showCount}
        textType={textType}
      />
    </div>
  )
}
