import { Field } from 'formik'
import { CustomRadioGroup } from './_models'
import Radio from '../Forms/Radio/Radio'
import { useState } from 'react'
import { Spin } from 'antd'
import { Typography } from 'antd'

export default ({
  parentClassName,
  label,
  name,
  lableClassName,
  testAttr,
  groupClassName,
  radClassName,
  fieldsChangeHandler,
  optionsState,
  loadingState,
  disabled,
  errMessageType
}: CustomRadioGroup): JSX.Element => {
  const [fieldErr, setFieldErr] = useState<string | undefined>()

  return (
    <div className={parentClassName}>
      {label && (
        <label className={lableClassName}>
          <Typography.Text>{label}</Typography.Text>
        </label>
      )}

      <Spin spinning={loadingState[name] ? loadingState[name] : false}>
        <div role='group' className={groupClassName} aria-labelledby='my-radio-group'>
          {optionsState[name] ? (
            optionsState[name].map((el: any, idx: number) => (
              <label key={idx}>
                <Field
                  key={idx}
                  className={radClassName}
                  name={name}
                  component={Radio}
                  value={el?.value}
                  testAttr={testAttr}
                  disabled={disabled}
                  fieldsChangeHandler={fieldsChangeHandler}
                  errMessageType={errMessageType}
                  obj={el}
                  idx={idx}
                  setFieldErr={setFieldErr}
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

      {/* {errors && errors[name] && (
    <div className="text-danger mt-2">{errors[name]}</div>
  )} */}
    </div>
  )
}
