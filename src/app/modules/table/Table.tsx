import React from 'react'
import { Table as AntdTable, ConfigProvider, theme } from 'antd'
import { ColumnGroupType, ColumnType } from 'antd/es/table'

const { darkAlgorithm, defaultAlgorithm } = theme

type T_table_props = {
  data: any[]
  loading: boolean
  columns: (ColumnGroupType<any> | ColumnType<any>)[]
  tableProps?: object
}

const Table = (props: T_table_props): JSX.Element => {
  const { data, loading, columns, tableProps } = props

  const { settings } = {settings:{mode:'light'}}

  return (
    <ConfigProvider
      theme={{
        algorithm: settings.mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
        token: { colorBgContainer: settings.mode === 'dark' ? 'rgba(47, 51, 73, 0.95)' : '#ffffff' }
      }}
    >
      <AntdTable
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1500 }}
        locale={{ emptyText: 'داده موردنظر دریافت نشد' }}
        {...tableProps}
      />
    </ConfigProvider>
  )
}

export default Table
