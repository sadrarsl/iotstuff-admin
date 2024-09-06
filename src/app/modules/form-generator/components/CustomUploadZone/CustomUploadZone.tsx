import React from 'react'
import { CustomUploadZone } from './_models'
import { Field } from 'formik'
import UploadZone from '../Forms/UploadZone/UploadZone'
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
  accept,
  action,
  uploadHint,
  method
}: CustomUploadZone) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}
      <Field
        name={name && name}
        component={UploadZone}
        className={className}
        accept={accept && accept}
        action={action && action}
        placeholder={placeholder && placeholder}
        errMessageType={errMessageType}
        testAttr={testAttr || ''}
        filesChangeHandler={filesChangeHandler}
        loadingState={loadingState}
        disabled={disabled}
        uploadHint={uploadHint}
        method={method}
      />
    </div>
  )
}
