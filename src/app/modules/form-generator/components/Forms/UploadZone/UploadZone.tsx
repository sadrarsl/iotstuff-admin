import { UploadOutlined } from '@ant-design/icons'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useEffect, useState } from 'react'
import { Button, Typography, Upload } from 'antd'
import { useFormikContext } from 'formik'
import { UploadZone } from './_models'

const DraggableUploadListItem = ({ originNode, file }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.uid
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move'
  }

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? 'is-dragging' : ''} {...attributes} {...listeners}>
      {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>
  )
}

export default ({
  field, // { name, value, onChange, onBlur }

  filesChangeHandler,
  className,
  errMessageType,
  disabled,
  accept,
  action,
  maxCount,
  uploadHint,
  onRemove
}: UploadZone) => {
  const { setFieldValue, errors, values, setFieldError }: any = useFormikContext()

  const [fileList, setFileList] = useState([])
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  useEffect(() => {
    if (fileList.length === 0 && values[field.name]) {
      setFileList(values[field.name])
      if (values[field.name].length !== 0) {
        setFieldValue(
          field.name,
          values[field.name].map((el: any) => el.url)
        )
      }
    } else if (!values[field.name]) {
      setFileList([])
    }
  }, [values])
  const onDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      setFileList(prev => {
        const activeIndex = prev.findIndex((i: any) => i.uid === active.id)
        const overIndex = prev.findIndex((i: any) => i.uid === over?.id)

        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }
  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(
      newFileList.map((le: any) => {
        le.status = 'done'

        return le
      })
    )
    filesChangeHandler({
      name: field.name,
      filesOrFile: newFileList.map((el: any) => el.originFileObj),
      setFieldValue
    })
  }

  return (
    <div>
      <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
        <SortableContext items={fileList.map((i: any) => i.uid)} strategy={verticalListSortingStrategy}>
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
            fileList={fileList}
            multiple={true}
            accept={accept && accept}
            onChange={onChange}
            maxCount={maxCount}
            beforeUpload={() => {
              if (!action) {
                return false
              }
            }}
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
            className={className && className}
            disabled={disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false}
            itemRender={(originNode, file) => <DraggableUploadListItem originNode={originNode} file={file} />}
          >
            <Button icon={<UploadOutlined />} style={{ width: '15rem', height: '15rem' }}>
              {uploadHint ? uploadHint : 'Click Or Drop To Upload'}
            </Button>
          </Upload>
        </SortableContext>
      </DndContext>
      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
    </div>
  )
}
