import { Tag } from 'antd'
import { ReactNode } from 'react'

export const optionalDataDisplay = (
  data: any,
  notAvailableText: string,
  dataAttrs?: object,
  tagAttrs?: object
): ReactNode => {
  if (data) {
    return <span {...dataAttrs}>{data}</span>
  } else {
    return (
      <Tag color={'red'} {...tagAttrs}>
        {notAvailableText}
      </Tag>
    )
  }
}

export const columnBaseProps = (
  columnName: string,
  columnLabel: string
): { title: string; dataIndex: string; key: string } => ({ title: columnLabel, dataIndex: columnName, key: columnName })

export const searchFieldsPlaceholderHandler = (fieldName: string): string => `جست و جو ${fieldName}`

export const numberSearchATTRS = (fieldName: string, moreATTRS?: object): object => ({
  placeholder: searchFieldsPlaceholderHandler(fieldName),
  dir: 'ltr',
  allowClear: true,
  ...moreATTRS
})

export const stringSearchATTRS = (fieldName: string, moreATTRS?: object): object => ({
  placeholder: searchFieldsPlaceholderHandler(fieldName),
  allowClear: true,
  ...moreATTRS
})

export const socialMediaSearchATTRS = (fieldName: string, moreATTRS?: object): object => ({
  placeholder: searchFieldsPlaceholderHandler(fieldName),
  addonAfter: '@',
  dir: 'ltr',
  allowClear: true,
  ...moreATTRS
})

export const formatFloat = (floatNum: number | undefined) => {
  if (floatNum) {
    return parseFloat(floatNum.toFixed(2))
  } else {
    return undefined
  }
}
