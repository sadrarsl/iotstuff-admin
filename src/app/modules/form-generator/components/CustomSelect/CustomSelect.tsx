import { Field } from 'formik'
import { CustomSelect } from './_models'
import Select from '../Forms/Select/Select'
import { Typography } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  placeholder,
  className,
  lableClassName,
  testAttr,
  fieldsChangeHandler,
  optionsState,
  loadingState,
  errMessageType,
  setFieldValue,
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
  onSearch
}: CustomSelect) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}
      <Field
        name={name && name}
        component={Select}
        className={className}
        placeholder={placeholder && placeholder}
        testAttr={testAttr || ''}
        errMessageType={errMessageType}
        setFieldValue={setFieldValue}
        disabled={disabled}
        direction={direction}
        allowClear={allowClear}
        autoClearSearchValue={autoClearSearchValue}
        autoFocus={autoFocus}
        bordered={bordered}
        defaultActiveFirstOption={defaultActiveFirstOption}
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        dropdownRender={dropdownRender}
        dropdownStyle={dropdownStyle}
        onSearch={onSearch}
        fieldNames={fieldNames}
        filterOption={filterOption}
        filterSort={filterSort}
        getPopupContainer={getPopupContainer}
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
        options={optionsState[name]}
        fieldsChangeHandler={fieldsChangeHandler}
        type='search'
        loadingState={loadingState}
      />
    </div>
  )
}
