import { Field, useFormikContext } from 'formik'
import { CustomCheckboxGroup } from './_models'
import { useState } from 'react'
import { Spin, Typography } from 'antd'
import { Checkbox } from '../Forms/Checkbox-Group/Checkbox-Group'
import { Checkbox as AntdCheckbox } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  groupClassName,
  chkClassName,
  testAttr,
  lableClassName,
  optionsState,
  fieldsChangeHandler,
  arrayTypeDeSelectHandler,
  loadingState,
  disabled,
  errMessageType,
  autoFocus,
  indeterminate,
  className,
  optionalFieldDeleteAllHandler
}: CustomCheckboxGroup) => {
  const [fieldErr, setFieldErr] = useState<string | undefined>()

  const { values, setFieldValue, setErrors }: any = useFormikContext()

  const onCheckAllChange = (e: any) => {
    if (e.target.checked) {
      const allValues: any[] = optionsState[name].map(el => el.value)
      const fieldValues = values[name] || []
      const difference = allValues.filter(item => !fieldValues.includes(item))
      difference.forEach((dif, idx) => {
        fieldsChangeHandler({
          name,
          setFieldValue,
          values: { ...values, [name]: allValues },
          value: dif,
          setErrors,
          isArrayType: true
        })
      })

      setFieldValue(name, allValues)
    } else {
      setFieldValue(name, [])
      optionalFieldDeleteAllHandler({
        name,
        setFieldValue,
        values: { ...values, [name]: [] }
      })
    }
  }

  const checkAll: boolean =
    optionsState[name] && values[name] && optionsState[name].length === values[name].length ? true : false

  const indeterminatePlus =
    optionsState[name] &&
    values[name] &&
    indeterminate &&
    values[name].length > 0 &&
    values[name].length < optionsState[name].length

  return (
    <div className={parentClassName}>
      <label className={lableClassName}>
        {indeterminate && optionsState[name] && optionsState[name].length !== 0 ? (
          <AntdCheckbox indeterminate={indeterminatePlus} onChange={onCheckAllChange} checked={checkAll} />
        ) : null}
        {label}
      </label>
      <Spin spinning={loadingState[name] ? loadingState[name] : false}>
        <div role='group' className={groupClassName} aria-labelledby='checkbox-group'>
          {optionsState[name] && optionsState[name].length !== 0 ? (
            optionsState[name].map((el: any, idx: number) => (
              <label key={idx} className={chkClassName}>
                <Field
                  key={idx}
                  component={Checkbox}
                  fieldsChangeHandler={fieldsChangeHandler}
                  testAttr={testAttr}
                  name={name}
                  className={className}
                  value={el?.value}
                  arrayTypeDeSelectHandler={arrayTypeDeSelectHandler}
                  errMessageType={errMessageType}
                  disabled={disabled}
                  obj={el}
                  idx={idx}
                  setFieldErr={setFieldErr}
                  autoFocus={autoFocus}
                  indeterminate={indeterminate}
                />
                {el?.title}
              </label>
            ))
          ) : (
            <h6 className='my-2 text-danger'>No Data</h6>
          )}
          {errMessageType === 'Field' && fieldErr && <Typography.Text type='danger'>{fieldErr}</Typography.Text>}
        </div>
      </Spin>
    </div>
  )
}
