import { Select as AntdSelect, Typography } from 'antd'
import { useFormikContext } from 'formik'
import { MultiSelect } from './_models'
import { useState } from 'react'

const { Option } = AntdSelect

export default ({
  field,
  form,

  optionsState,
  fieldsChangeHandler,
  className,
  errMessageType,
  arrayTypeDeSelectHandler,
  disabled,
  direction,
  allowClear,
  autoClearSearchValue,
  autoFocus,
  bordered,
  defaultActiveFirstOption,
  defaultOpen,
  defaultValue,
  dropdownRender,
  dropdownStyle,
  fieldNames,
  filterOption,
  filterSort,
  getPopupContainer,
  labelInValue,
  maxTagCount,
  maxTagTextLength,
  menuItemSelectedIcon,
  notFoundContent,
  onBlur,
  onDropdownVisibleChange,
  optionFilterProp,
  open,
  optionLabelProp,
  popupClassName,
  placement,
  popupMatchSelectWidth,
  removeIcon,
  showSearch,
  size,
  status,
  suffixIcon,
  virtual,
  onSearch,
  optionalFieldDeleteAllHandler
}: MultiSelect) => {
  const { setFieldValue, values, errors, setErrors }: any = useFormikContext()
  const [searchedValue, setSearchedValue] = useState<string>('')

  return (
    <>
      <AntdSelect
        mode='multiple'
        value={values[field?.name] || []}
        status={status || (errors[field.name] && 'error')}
        disabled={disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false}
        onSelect={(e, a) => {
          const nextGenerted = values[field.name] ? values[field.name] : []
          fieldsChangeHandler({
            name: field.name,
            setFieldValue,
            values: { ...values, [field.name]: [...nextGenerted, e] },
            value: e,
            isArrayType: true,
            setErrors
          })
        }}
        onDeselect={e => {
          let thisValues = values[field.name]
          thisValues = thisValues.filter((el: any) => el !== e)
          setFieldValue(field.name, thisValues)
          const passingValues = { ...values, [field.name]: thisValues }
          arrayTypeDeSelectHandler(e, field.name, setFieldValue, passingValues)
        }}
        onClear={() => {
          setFieldValue(field.name, [])
          optionalFieldDeleteAllHandler({
            name: field.name,
            setFieldValue,
            values: { ...values, [field.name]: [] }
          })
        }}
        style={{ width: '100%' }}
        direction={direction && direction}
        allowClear={allowClear && allowClear}
        autoClearSearchValue={autoClearSearchValue && autoClearSearchValue}
        autoFocus={autoFocus && autoFocus}
        bordered={bordered && bordered}
        defaultActiveFirstOption={defaultActiveFirstOption && defaultActiveFirstOption}
        defaultOpen={defaultOpen && defaultOpen}
        defaultValue={defaultValue && defaultValue}
        dropdownRender={dropdownRender && dropdownRender}
        dropdownStyle={dropdownStyle && dropdownStyle}
        fieldNames={fieldNames && fieldNames}
        filterOption={filterOption && filterOption}
        filterSort={filterSort && filterSort}
        getPopupContainer={getPopupContainer && getPopupContainer}
        labelInValue={labelInValue && labelInValue}
        onSearch={e => {
          setSearchedValue(e)
          if (onSearch) {
            onSearch(e)
          }
        }}
        maxTagCount={maxTagCount && maxTagCount}
        maxTagTextLength={maxTagTextLength && maxTagTextLength}
        menuItemSelectedIcon={menuItemSelectedIcon && menuItemSelectedIcon}
        notFoundContent={notFoundContent && notFoundContent}
        onBlur={onBlur && onBlur}
        onDropdownVisibleChange={onDropdownVisibleChange && onDropdownVisibleChange}
        optionFilterProp={optionFilterProp && optionFilterProp}
        open={open && open}
        optionLabelProp={optionLabelProp && optionLabelProp}
        popupClassName={popupClassName && popupClassName}
        placement={placement && placement}
        popupMatchSelectWidth={popupMatchSelectWidth && popupMatchSelectWidth}
        removeIcon={removeIcon && removeIcon}
        searchValue={searchedValue}
        showSearch={showSearch && showSearch}
        size={size && size}
        suffixIcon={suffixIcon && suffixIcon}
        virtual={virtual && virtual}
      >
        {optionsState[field.name] &&
          optionsState[field.name].map((el, idx) => {
            return (
              <Option key={idx} {...el}>
                {el?.title}
              </Option>
            )
          })}
      </AntdSelect>
      {errMessageType === 'Field' && form.errors[field.name] && (
        <Typography.Text type='danger'>{form.errors[field.name]}</Typography.Text>
      )}
    </>
  )
}
