import React from 'react'
import { CustomImageUpload } from './_models'
import { Field } from 'formik'
import ImageUpload from '../Forms/ImageUpload/ImageUpload'
import { Typography } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  placeholder,
  className,
  testAttr,
  lableClassName,
  filesChangeHandler,
  loadingState,
  errMessageType,
  disabled,
  maxCount,
  accept,
  action,
  listType,
  uploadHint,
  method
}: CustomImageUpload) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}
      <Field
        name={name && name}
        component={ImageUpload}
        className={className}
        maxCount={maxCount}
        accept={accept && accept}
        action={action && action}
        placeholder={placeholder && placeholder}
        errMessageType={errMessageType}
        testAttr={testAttr || ''}
        filesChangeHandler={filesChangeHandler}
        loadingState={loadingState}
        disabled={disabled}
        listType={listType}
        uploadHint={uploadHint}
        method={method}
      />
    </div>
  )
}
