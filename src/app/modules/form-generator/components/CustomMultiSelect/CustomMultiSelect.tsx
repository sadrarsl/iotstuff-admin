import { Field } from 'formik'
import { CustomMultiSelect } from './_models'
import MultiSelect from '../Forms/MultiSelect/MultiSelect'
import { Typography } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  placeholder,
  className,
  lableClassName,
  testAttr,
  optionsState,
  fieldsChangeHandler,
  arrayTypeDeSelectHandler,
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
  searchValue,
  showSearch,
  size,
  status,
  suffixIcon,
  virtual,
  onSearch,
  optionalFieldDeleteAllHandler
}: CustomMultiSelect) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}
      <Field
        name={name && name}
        component={MultiSelect}
        className={className}
        placeholder={placeholder && placeholder}
        testAttr={testAttr || ''}
        errMessageType={errMessageType}
        optionsState={optionsState}
        fieldsChangeHandler={fieldsChangeHandler}
        arrayTypeDeSelectHandler={arrayTypeDeSelectHandler}
        disabled={disabled}
        direction={direction}
        allowClear={allowClear}
        onSearch={onSearch}
        autoClearSearchValue={autoClearSearchValue}
        autoFocus={autoFocus}
        bordered={bordered}
        defaultActiveFirstOption={defaultActiveFirstOption}
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        dropdownRender={dropdownRender}
        dropdownStyle={dropdownStyle}
        fieldNames={fieldNames}
        filterOption={filterOption}
        filterSort={filterSort}
        getPopupContainer={getPopupContainer}
        optionalFieldDeleteAllHandler={optionalFieldDeleteAllHandler}
        labelInValue={labelInValue}
        loading={loading}
        maxTagCount={maxTagCount}
        maxTagTextLength={maxTagTextLength}
        menuItemSelectedIcon={menuItemSelectedIcon}
        notFoundContent={notFoundContent}
        onBlur={onBlur}
        onDropdownVisibleChange={onDropdownVisibleChange}
        optionFilterProp={optionFilterProp}
        open={open}
        optionLabelProp={optionLabelProp}
        popupClassName={popupClassName}
        placement={placement}
        popupMatchSelectWidth={popupMatchSelectWidth}
        removeIcon={removeIcon}
        searchValue={searchValue}
        showSearch={showSearch}
        size={size}
        status={status}
        suffixIcon={suffixIcon}
        virtual={virtual}
      />
    </div>
  )
}
