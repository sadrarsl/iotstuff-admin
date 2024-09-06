import { Select as AntdSelect, Typography } from 'antd'
import { useFormikContext } from 'formik'
import { Select } from './_models'
import { useState } from 'react'

const { Option } = AntdSelect

export default ({
  field,
  options,
  className,
  fieldsChangeHandler,
  loadingState,
  errMessageType,
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
  loading,
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
  onClear
}: Select) => {
  const [searchedValue, setSearchedValue] = useState<string>('')

  const { values, setFieldValue, setErrors, errors }: any = useFormikContext()

  return (
    <>
      {' '}
      <AntdSelect
        disabled={disabled ? (typeof disabled === 'boolean' ? disabled : disabled(values)) : false}
        onChange={(e, a) => {
          fieldsChangeHandler({
            name: field.name,
            setFieldValue,
            values: { ...values, [field.name]: e },
            setErrors,
            value: e
          })
        }}
        direction={direction && direction}
        allowClear={allowClear && allowClear}
        autoClearSearchValue={autoClearSearchValue && autoClearSearchValue}
        autoFocus={autoFocus && autoFocus}
        bordered={bordered && bordered}
        defaultActiveFirstOption={defaultActiveFirstOption && defaultActiveFirstOption}
        defaultOpen={defaultOpen && defaultOpen}
        defaultValue={defaultValue && defaultValue}
        onClear={onClear && onClear}
        dropdownRender={dropdownRender && dropdownRender}
        onSearch={e => {
          setSearchedValue(e)
          if (onSearch) {
            onSearch(e)
          }
        }}
        dropdownStyle={dropdownStyle && dropdownStyle}
        fieldNames={fieldNames && fieldNames}
        filterOption={filterOption && filterOption}
        filterSort={filterSort && filterSort}
        getPopupContainer={getPopupContainer && getPopupContainer}
        labelInValue={labelInValue && labelInValue}
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
        status={status || (errors[field.name] && 'error')}
        className={className}
        loading={loading || loadingState[field.name] || false}
        value={values[field?.name] && values[field?.name]}
      >
        {options &&
          options.map((el, idx) => {
            return (
              <Option key={idx} {...el}>
                {el?.title}
              </Option>
            )
          })}
      </AntdSelect>
      {errMessageType === 'Field' && errors[field.name] && (
        <Typography.Text type='danger'>{errors[field.name]}</Typography.Text>
      )}
    </>
  )
}
