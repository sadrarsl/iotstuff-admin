import React, { useEffect, useState } from 'react'
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'

import { Modal, Typography, Upload } from 'antd'
import { useFormikContext } from 'formik'
import { getBase64 } from '../../../modules/form-generator/functions'
import { ImageUpload } from './_models'

export default ({
  field, // { name, value, onChange, onBlur }

  filesChangeHandler,
  className,
  errMessageType,
  disabled,
  accept,
  action,
  maxCount,
  listType,
  uploadHint,
  resultType,
  onRemove
}: ImageUpload) => {
  const { setFieldValue, errors, values, setFieldError }: any = useFormikContext()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (fileList.length === 0 && values[field.name]) {
      setFileList(values[field.name])
    } else if (!values[field.name]) {
      setFileList([])
    }
  }, [values])

  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const handleChange = async ({ fileList: newFileList }: any) => {
    setFileList(
      newFileList.map((le: any) => {
        le.status = 'done'

        return le
      })
    )

    if (resultType === 'File') {
      await filesChangeHandler({
        name: field.name,
        filesOrFile: newFileList.map((el: any) => el.originFileObj),
        setFieldValue
      })
    } else if (resultType === 'Base64') {
      const base64s = await newFileList.map(async (el: any) => await getBase64(el.originFileObj))
      await filesChangeHandler({
        name: field.name,
        filesOrFile: base64s,
        setFieldValue
      })
    }
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        {uploadHint ? uploadHint : 'Upload'}
      </div>
    </div>
  )

  return (
    <>
      <Upload
        action={(file: any): any => {
          if (action) {
            action({
              file,
              setFieldValue,
              values,
              name: field.name,
              setFieldError
            })
          }
        }}
        listType={listType || 'picture-circle'}
        accept={accept && accept}
        maxCount={maxCount}
        className={className && className}
        onRemove={e => {
          if (onRemove) {
            onRemove({
              file: e,
              setFieldValue,
              values,
              name: field.name,
              setFieldError
            })
          }
        }}
        fileList={fileList}
        onPreview={handlePreview}
        disabled={disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false}
        onChange={e => {
          handleChange({ fileList: e.fileList })
        }}
        beforeUpload={() => {
          if (!action) {
            return false
          }
        }}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
      <Modal open={previewOpen} zIndex={9999} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt='example'
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}
