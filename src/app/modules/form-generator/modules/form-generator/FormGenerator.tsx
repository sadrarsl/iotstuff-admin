import { Formik, FormikValues, useFormikContext } from 'formik'
import {
  FormGenerator,
  Relation,
  RelationState,
  ValueRelationTypes,
  OptionParentChildsHandler,
  OptionsState,
  FieldChangeHandler,
  Options,
  LoadingState,
  FileChangeHandler,
  HandleSubmitObj,
  HandleCancelObj
} from './_models'
import {
  FieldsGenerator,
  fieldInitValueGenerator,
  findElementIndexInArray,
  isRelationAlreadyParent,
  removeDuplicatesByProperty,
  stringSubjectEqualness,
  validFieldsForOptionRelation,
  valueValidationObject
} from './functions'
import { ReactNode, useEffect, useState } from 'react'
import { Button, notification } from 'antd'
import { _Field } from '../Core/_models'
import { FieldsType } from '../Core/_types'

export default ({
  initState,
  fields,
  validation,
  onFormChange,
  footerClassName,
  handleCancel,
  handleSubmit,
  errMessageType,
  toastErrObj,
  conditionalRender
}: FormGenerator): JSX.Element => {
  const [relations, setRelations] = useState<RelationState[]>([])
  const [optionsState, setOptionsState] = useState<OptionsState>({})
  const [loadingState, setLoadingState] = useState<LoadingState>({})
  // Declared To Hold Table's Loading Status During Data Fetching
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditInitied, setIsEditInited] = useState<boolean>(false)
  const [_fields, setFields] = useState<_Field<FieldsType>[]>([])
  const [formikProps, setFormikProps] = useState<any>()
  const [formikValues, setFormikValues] = useState<any>({})
  const [recievedValidationSchema, setRecievedValidationSchema] = useState(null)

  // Below Function Set FormikProps Changes In formikProps And formikValues
  const HellanBaba = () => {
    const props = useFormikContext()
    setTimeout(() => {
      if (JSON.stringify(formikValues) !== JSON.stringify(props.values)) {
        setFormikValues(props.values)
      }

      const propsCopy: any = props.values
      delete propsCopy.values
      if (JSON.stringify(formikProps) !== JSON.stringify(propsCopy)) {
        setFormikProps(props)
      }
    })

    return <></>
  }

  // Fetch Field's Options And Field's Relations's Options
  const editOptionsIniter = () => {
    if (!isEditInitied && relations.length !== 0) {
      relations.forEach(async (relation: RelationState) => {
        const isOptionRelation: boolean = relation.type === 'Option' ? true : false

        if (isOptionRelation) {
          const parentFieldName = relation.name

          const isParentValueAvailable: boolean = initState[parentFieldName] ? true : false
          if (isParentValueAvailable) {
            const fieldObj: _Field<FieldsType> | undefined = _fields.find(
              (field: _Field<FieldsType>): _Field<FieldsType> | undefined => {
                if (field.name === relation.name) {
                  return field
                }
              }
            )

            if (fieldObj && fieldObj.type !== 'CustomComponent') {
              const isArrayValueArr = typeof initState[parentFieldName] === 'object'

              const extFuncAvailable = fieldObj.parentExitFunction?.onLoad
              if (isArrayValueArr) {
                if (extFuncAvailable) {
                  initState[parentFieldName].forEach(async (oneOfValues: any) => {
                    setTimeout(async () => {
                      const fetchedData = await extFuncAvailable({
                        values: initState,
                        lastChangedValue: oneOfValues
                      })
                      if (fetchedData) {
                        relation.childs.forEach(() => {
                          const valuesRelationalWithKeys = relation?.childs
                            .map((el: any) => {
                              return relations.find(le => le.name === el && le.type === 'Value')
                            })
                            .filter((v: any) => v !== undefined)
                          const valueKey: string = relation?.KeyValue_Option || ''
                          const titleKey: string = relation?.KeyID_Option || ''
                          const changedFieldOptionRelationsData =
                            fetchedData &&
                            fetchedData.map((el: any) => {
                              let newItem: any = {
                                title: el[valueKey],
                                value: el[titleKey]
                              }

                              newItem.xyzId = oneOfValues

                              if (valuesRelationalWithKeys) {
                                valuesRelationalWithKeys.forEach((le: any) => {
                                  le.childs.forEach((v: any) => {
                                    newItem = {
                                      ...newItem,
                                      [v.key]: el[v.key]
                                    }
                                  })
                                })
                              }

                              return newItem
                            })

                          if (changedFieldOptionRelationsData) {
                            relation.childs.forEach((cx: string | ValueRelationTypes) => {
                              if (typeof cx === 'string') {
                                setOptionsState((vx: OptionsState) => {
                                  return {
                                    ...vx,
                                    [cx]: [...vx[cx], ...changedFieldOptionRelationsData]
                                  }
                                })
                              }
                            })
                          }
                        })
                      }
                    }, 400)
                  })
                }
              } else {
                if (extFuncAvailable) {
                  const fetchedData = await extFuncAvailable({
                    values: initState
                  })
                  if (fetchedData) {
                    relation.childs.forEach(() => {
                      const valuesRelationalWithKeys = relation?.childs
                        .map((el: any) => {
                          return relations.find(le => le.name === el && le.type === 'Value')
                        })
                        .filter((v: any) => v !== undefined)
                      const valueKey: string = relation?.KeyValue_Option || ''
                      const titleKey: string = relation?.KeyID_Option || ''
                      const changedFieldOptionRelationsData =
                        fetchedData &&
                        fetchedData.map((el: any) => {
                          let newItem: any = {
                            title: el[valueKey],
                            value: el[titleKey]
                          }
                          if (valuesRelationalWithKeys) {
                            valuesRelationalWithKeys.forEach((le: any) => {
                              le.childs.forEach((v: any) => {
                                newItem = { ...newItem, [v.key]: el[v.key] }
                              })
                            })
                          }

                          return newItem
                        })

                      if (changedFieldOptionRelationsData) {
                        relation.childs.forEach((cx: string | ValueRelationTypes) => {
                          if (typeof cx === 'string') {
                            setOptionsState((vx: OptionsState) => {
                              return {
                                ...vx,
                                [cx]: changedFieldOptionRelationsData
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                }
              }
            }
          }
        }
      })
      setIsEditInited(true)
    }
  }

  //Check If Field's Type Is Valid For Relation
  const isValidForOptionRelaiton = (fieldType: string): boolean => {
    // If Field's Name Existed In validFieldsForOptionRelation Array It Can Have Option Validation

    const isValid: boolean = validFieldsForOptionRelation.find((valField: string) =>
      stringSubjectEqualness(valField, fieldType)
    )
      ? true
      : false

    return isValid
  }

  const checkFieldsValidationForOptionRelation = (): void => {
    // Looping Through Field Array To Check Field Authorize For Option Relation
    _fields.forEach((field: _Field<FieldsType>) => {
      if (field.type !== 'CustomComponent') {
        const fieldName: string = field.name.toLowerCase()
        const fieldType: string = field.type

        const isOptionRelationPassed: boolean =
          field.relations &&
          field?.relations.find((relation: Relation) => stringSubjectEqualness(relation.type, 'Option'))
            ? true
            : false

        const isValueRelationPassed =
          field.relations &&
          field?.relations.find((relation: Relation) => stringSubjectEqualness(relation.type, 'Value'))

        if (isOptionRelationPassed) {
          // Checks IF Field's Type Permitated For Relation
          const isValid: boolean = isValidForOptionRelaiton(fieldType)
          if (!isValid) {
            throw new Error(
              `${fieldName} Is Not Authorized To Have Option Relation. Valid Types For Option Relation Are ${JSON.stringify(
                validFieldsForOptionRelation
              )}`
            )
          }
        }

        if (isValueRelationPassed) {
          const parentFieldType = _fields.find((field: _Field<FieldsType>) =>
            stringSubjectEqualness(isValueRelationPassed.parent, field.name)
          )
          if (parentFieldType && valueValidationObject[parentFieldType.type.toLowerCase()]) {
            const acceptableParentFieldForValueRelation = valueValidationObject[parentFieldType.type]

            const isRelationTypesMatched: boolean = acceptableParentFieldForValueRelation.find((typeName: string) =>
              stringSubjectEqualness(typeName, fieldType)
            )
              ? true
              : false

            if (!isRelationTypesMatched && !isValueRelationPassed.formatter) {
              throw new Error(
                `${fieldName}'s type don't exist in ${JSON.stringify(
                  acceptableParentFieldForValueRelation
                )} it means child's type don't match with parent's type
                you can add formatter function in ${JSON.stringify(isValueRelationPassed)} to handle it
              `
              )
            }
          } else {
            throw new Error(`
          valueValidationObject => ${JSON.stringify(valueValidationObject)}
          ${fieldType}'s value relation parent does Not Exist In valueValidationObject
          If You Added New Field You Should Define It In valueValidationObject 
          `)
          }
        }
      }
    })
  }

  // Below Function Hanlde Value Conditional Functions , Pass Values To Function On Values Change
  const handlePropsValueChange = () => {
    if (conditionalRender) {
      const newFields: _Field<FieldsType>[] = conditionalRender(formikValues)
      setFields(newFields)
    }

    if (typeof validation === 'function') {
      const newValidation = validation(formikValues)
      setRecievedValidationSchema(newValidation)
    }

    if (onFormChange) {
      onFormChange(formikValues, formikProps)
    }
  }

  //Below Function Checks If Passed Props Structures Are True
  const propsValidation = () => {
    _fields.forEach((el: _Field<FieldsType>) => {
      if (el.type !== 'CustomComponent') {
        if (el.relations) {
          const OptionRelations = el.relations?.filter(r => r.type === 'Option')
          const ValueRelations = el.relations?.filter(r => r.type === 'Value')

          if (OptionRelations.length !== 0) {
            if (OptionRelations && OptionRelations?.length <= 1) {
              const isOptionRelationValid: boolean =
                OptionRelations[0]?.KeyID_Option && OptionRelations[0]?.KeyValue_Option ? true : false
              if (!isOptionRelationValid) {
                throw new Error(`Option Relations Require KeyID_Option and KeyValue_Option`)
              }
            } else if (OptionRelations && OptionRelations?.length > 1) {
              throw new Error(`${el.name}'s relations are duplicated. one option and value relation acceptable`)
            }
          }

          if (ValueRelations.length !== 0) {
            if (ValueRelations && ValueRelations?.length <= 1) {
              const isValueRelationValid: boolean = ValueRelations[0]?.Key_value ? true : false
              if (!isValueRelationValid) {
                throw new Error(`Value Relations Require KeyValue_Option`)
              }
            } else if (ValueRelations && ValueRelations?.length > 1) {
              throw new Error(`${el.name}'s relations are duplicated. one option and value relation acceptable`)
            }
          }

          el.relations?.forEach(le => {
            if (le.parent && le.type) {
              const parentField = _fields.find((f: _Field<FieldsType>) => {
                if (f.name === le.parent) {
                  return f
                }
              })
              if (parentField?.type !== 'CustomComponent') {
                if (parentField) {
                  if (!parentField['parentExitFunction']) {
                    throw new Error(`${parentField.name} Is Parent Field But Don't Have parentExitFunction`)
                  }
                } else {
                  throw new Error(`${el.name}'s ${le.parent} Relation's Field Dont Exist`)
                }
              }
            } else {
              throw new Error(`${el.name}'s relations are incorrect. Check Type And Parent`)
            }
          })
        } else {
          // let type = el.type;
          // if (type !== "CustomComponent") {
          //   if (
          //     type === "Select" ||
          //     type === "MultiSelect" ||
          //     type === "Radio" ||
          //     type == "CheckBoxGroup"
          //   ) {
          //     if (!el.options) {
          //       throw new Error(
          //         "Non Relational Options  Need Attr(Options, ValueKey , LabelKey)"
          //       );
          //     }
          //   }
          // }
        }
      }
    })
  }

  // Below Function Init Relations And sets in relations State
  const relationsIniter = (relation: Relation, field: _Field<FieldsType>) => {
    //Checking If Field Relation Is Parent Or Not
    const isRelationParent: boolean = isRelationAlreadyParent(relation, relations)

    const relationType: string = relation.type

    // Cheking If Field Relation Type Is Value
    const isRelationValue: boolean = stringSubjectEqualness(relationType, 'value')

    if (isRelationParent) {
      // Getting Relation Index In Array To Inject Childs
      const relationStateIndex: number = findElementIndexInArray(
        relations,
        relation,
        ({ arrayElement, passedElement }) => {
          return (
            arrayElement.name.toLowerCase() === passedElement.parent.toLowerCase() &&
            arrayElement.type.toLowerCase() === passedElement.type.toLowerCase()
          )
        }
      )

      const childs: any[] = relations[relationStateIndex]?.childs || []
      if (isRelationValue) {
        //If Relation Type was Value We Should Set FieldName => field.name and key => relation.Key_value To Extract field with relation.Key_value from parent's Option's Object
        if (relation.Key_value) {
          const child: ValueRelationTypes = {
            key: relation.Key_value,
            name: field.name,
            formatter: relation.formatter
          }

          // Due To Component Re-render We Should Check if Child Already Exist Or Not
          const isOptionChildAvailable = childs.find(
            b => stringSubjectEqualness(b.key, child.key) && stringSubjectEqualness(b.name, child.name)
          )
          if (!isOptionChildAvailable) {
            childs.push(child)
          }
        }
      } else {
        // If Relation's Type Was Option We Should Only Keep FieldName => field.name For While Parent State Changed Get Field's KeyID_Option And KeyValue_Option From Props Fields And Render Options

        const child: string = field.name

        // Due To Component Re-render We Should Check if Child Already Exist Or Not

        const isRelationChildAvailable = childs.find(b => b === child)

        if (!isRelationChildAvailable) {
          childs.push(child)
        }

        // We Render All Field Options From optionsState So If Relation Type Was Option We Should Init Array For It In optionsState

        setOptionsState(
          (optionsState: OptionsState): OptionsState => ({
            ...optionsState,
            [field.name]: []
          })
        )
      }

      setRelations((relations: RelationState[]): RelationState[] => {
        relations[relationStateIndex].childs = childs

        return relations
      })
    } else {
      // If Parent Relation Was not Alreat Setted
      let parentRelationObject: RelationState = {
        name: relation.parent,
        type: relation.type,
        KeyID_Option: relation.KeyID_Option,
        KeyValue_Option: relation.KeyValue_Option,
        childs: []
      }
      if (isRelationValue) {
        //If Relation Type was Value We Should Set FieldName => field.name and key => relation.Key_value To Extract field with relation.Key_value from parent's Option's Object

        if (relation.Key_value) {
          const childs: ValueRelationTypes = {
            key: relation.Key_value,
            name: field.name
          }
          parentRelationObject = { ...parentRelationObject, childs: [childs] }
        }
      } else {
        // If Relation's Type Was Option We Should Only Keep FieldName => field.name For While Parent State Changed Get Field's KeyID_Option And KeyValue_Option From Props Fields And Render Options

        const childs: string = field.name
        parentRelationObject = { ...parentRelationObject, childs: [childs] }
      }

      setOptionsState(
        (optionsState: OptionsState): OptionsState => ({
          ...optionsState,
          [field.name]: []
        })
      )

      // این تیکرو هر چقد خواستم تیمز هندل کنم نشد

      const copy = relations
      copy.push(parentRelationObject)
      setRelations(copy)
    }
  }

  const relationStateInit = () => {
    // Crawling Through Props Fields And If Field had Relation Passing It To relationsIniter For Specified Temp
    _fields.forEach(async (field: _Field<FieldsType>) => {
      if (field.type !== 'CustomComponent') {
        if (field.relations) {
          field.relations.forEach(async (rel: Relation) => {
            await relationsIniter(rel, field)
          })
        }
      }
    })
  }

  const relationGather = (name: string | null, relation: RelationState[], type: string): any => {
    // Recursive Function That Gather Relation From Parent => name to last Child Based on Type Value Or Option
    if (name) {
      const isParent = relations.find(
        (relation: RelationState) =>
          stringSubjectEqualness(relation.name, name) && stringSubjectEqualness(relation.type, type)
      )

      if (isParent) {
        relation.push(isParent)

        isParent.childs.forEach((child: ValueRelationTypes | string) => {
          const isChildParent = relations.find(v => {
            if (typeof child === 'string') {
              return stringSubjectEqualness(v.name, child) && stringSubjectEqualness(v.type, type)
            } else if (child.name) {
              return stringSubjectEqualness(v.name, child.name) && stringSubjectEqualness(v.type, type)
            }
          })

          if (isChildParent && typeof child === 'string') {
            return relationGather(child, relation, type)
          }
        })

        return relationGather(null, relation, type)
      }
    } else {
      return relation
    }
  }

  // Below Function Generates Static Option Fields
  const handleNonRelationFieldsOptions = () => {
    //handleNonRelationFieldsOptions from passed data
    fields.forEach((field: _Field<FieldsType>) => {
      if (
        field.type !== 'CustomComponent' &&
        (field.type === 'CheckBoxGroup' ||
          field.type === 'MultiSelect' ||
          field.type === 'Select' ||
          field.type === 'Radio')
      ) {
        if (field?.options && field.LabelKey !== undefined && field.ValueKey !== undefined) {
          const valueKey: string = field.ValueKey
          const labelKey: string = field.LabelKey
          const generatedOptions: Options[] = []
          field.options.forEach((option: any) => {
            if (option[valueKey] !== undefined && option[labelKey] !== undefined) {
              const generatedOption: Options = {
                value: option[valueKey],
                title: option[labelKey]
              }
              generatedOptions.push(generatedOption)
            }
          })

          setOptionsState((optionsState: OptionsState): OptionsState => {
            return { ...optionsState, [field.name]: generatedOptions }
          })
        }
      }
    })
  }

  const useEffectFuncHandler = async () => {
    checkFieldsValidationForOptionRelation()
    propsValidation()
    await relationStateInit()
    editOptionsIniter()
  }

  const optionParentChildsHandler = ({ relations, setFieldValue, statedValues }: OptionParentChildsHandler) => {
    //handle options relation childs value and option
    relations.forEach((relation: any) => {
      relation.childs.forEach((child: ValueRelationTypes | string) => {
        if (typeof child === 'string') {
          const optionsStateCopy: OptionsState = optionsState
          optionsStateCopy[child] = []
          setOptionsState(optionsStateCopy)

          const initValue = fieldInitValueGenerator(child, _fields)
          setFieldValue(child, initValue)
          statedValues[child] = initValue
        }
      })
    })
  }

  // Below Function Set Field's Child Loading True WHile Fetching Data
  const optionRelationsLoadIniter = (optionsRelations: RelationState[]): void => {
    optionsRelations.forEach((optionRelation: RelationState) => {
      optionRelation.childs.forEach((child: string | ValueRelationTypes) => {
        if (typeof child === 'string') {
          setLoadingState((loadingState: LoadingState) => ({
            ...loadingState,
            [child]: true
          }))
        }
      })
    })
  }

  // Below Function Triggers WHen Multi Select Parent Clear Called
  const optionalFieldDeleteAllHandler = ({
    name,
    setFieldValue,
    values
  }: {
    name: string
    setFieldValue: any
    values: FormikValues
  }) => {
    const relations: RelationState[] | undefined = relationGather(name, [], 'Option')

    if (relations) {
      relations.forEach((relation: RelationState) => {
        relation.childs.forEach((child: string | ValueRelationTypes) => {
          if (typeof child === 'string') {
            const optionsStateCopy: OptionsState = optionsState
            optionsStateCopy[child] = []
            setOptionsState(optionsStateCopy)
            if (values[child]) {
              const childValues = values[child]
              const isChildArray = typeof childValues === 'object' ? true : false
              if (isChildArray) {
                setFieldValue(child, [])
              } else {
                setFieldValue(child, null)
              }
            }
          }
        })
      })
    }
  }

  // Below Functions Triggers When MultiSelect PArent Item Deselects
  const arrayTypeDeSelectHandler = (value: any, fieldName: string, setFieldValue: any, values: FormikValues) => {
    const relations: RelationState[] | undefined = relationGather(fieldName, [], 'Option')

    const parentsXYZIDS = { [fieldName]: [value] }
    const statedValuesCopy = values
    if (relations) {
      relations.forEach((relation: RelationState) => {
        relation.childs.forEach((child: string | ValueRelationTypes) => {
          if (typeof child === 'string') {
            const childOptions = optionsState[child]
            const willDeletedOptions = childOptions.filter(item => parentsXYZIDS[relation.name].includes(item.xyzId))
            parentsXYZIDS[child] = willDeletedOptions.map(el => el.value)

            const willSetOptions = childOptions.filter(item => !parentsXYZIDS[relation.name].includes(item.xyzId))

            const optionCopy = optionsState
            optionCopy[child] = willSetOptions
            setOptionsState(optionCopy)

            if (values[child]) {
              const childValues = values[child]
              const isChildArray = typeof childValues === 'object' ? true : false
              if (isChildArray) {
                const willDeletedValues = childValues.filter(
                  (value: any) => !willDeletedOptions.some(item => item.value === value)
                )

                setFieldValue(child, willDeletedValues)
                statedValuesCopy[child] = willDeletedValues
              } else {
                const isValuezOptionAvailable = optionsState[child].find(le => le.value === childValues)

                if (!isValuezOptionAvailable) {
                  setFieldValue(child, null)
                  statedValuesCopy[child] = null
                }
              }
            }
          }
        })
      })
    }
  }

  const filesChangeHandler = ({ name, filesOrFile, setFieldValue }: FileChangeHandler) => {
    setFieldValue(name, filesOrFile)
  }

  // Below Function Is Main Change Handler For All Fields
  const fieldsChangeHandler = async ({
    name,
    setFieldValue,
    values,
    value,
    setErrors,
    isArrayType = false
  }: FieldChangeHandler) => {
    if (isArrayType) {
      setFieldValue(name, values[name])
    } else {
      setFieldValue(name, value)
    }
    const optionsRelations = relationGather(name, [], 'Option')
    const statedValuesCopy = values

    const field = _fields.find(le => stringSubjectEqualness(le.name, name))
    if (optionsRelations && !isArrayType) {
      // Clearing Changed Field Option Childs For Reload
      optionParentChildsHandler({
        relations: optionsRelations,
        setFieldValue,
        statedValues: statedValuesCopy
      })
    }

    let extFuncAvailable
    if (field?.type !== 'CustomComponent') {
      extFuncAvailable = field?.parentExitFunction?.onChange
    }

    if (extFuncAvailable) {
      if (optionsRelations) {
        optionRelationsLoadIniter(optionsRelations)
      }

      // Clearing Changed Field Error For Reload
      if (setErrors) {
        setErrors({ [name]: null })
      }

      const fetchedData = await extFuncAvailable({
        values,
        lastChangedValue: value,
        ...formikProps
      })

      if (fetchedData === false) {
        // If Field's Service Returned Error
        setErrors({ [name]: 'Failed To Fetch Data' })
      }

      // Clearing Loading State
      setLoadingState({})

      //Getting Changed File Option Relations
      const optionRelationObj: RelationState | undefined = relations.find((relation: RelationState) => {
        if (stringSubjectEqualness(relation.name, name) && stringSubjectEqualness(relation.type, 'option')) {
          return relation
        }
      })

      if (optionRelationObj !== undefined) {
        // Find Changed Field's Option Relations's Value Relations To Generate Values Keys From Fetched Data For Parent Options
        const valuesRelationalWithKeys = optionRelationObj?.childs
          .map((child: string | ValueRelationTypes) => {
            if (typeof child == 'string') {
              return relations.find(
                le => stringSubjectEqualness(le.name, child) && stringSubjectEqualness(le.type, 'value')
              )
            }
          })
          .filter((v: any) => v !== undefined)

        const valueKey: string = optionRelationObj?.KeyValue_Option || ''
        const titleKey: string = optionRelationObj?.KeyID_Option || ''
        const changedFieldOptionRelationsData =
          fetchedData &&
          fetchedData.map((data: any) => {
            let newItem: any = {
              title: data[valueKey],
              value: data[titleKey]
            }

            newItem.xyzId = value

            if (valuesRelationalWithKeys) {
              valuesRelationalWithKeys.forEach((relation: RelationState | undefined) => {
                if (relation) {
                  relation.childs.forEach((child: string | ValueRelationTypes) => {
                    if (typeof child !== 'string') {
                      newItem = {
                        ...newItem,
                        [child.key]: data[child.key]
                      }
                    }
                  })
                }
              })
            }

            return newItem
          })

        if (changedFieldOptionRelationsData) {
          // Setting Changed Field Option Relations Generated Data
          optionsRelations[0].childs.forEach((child: string | ValueRelationTypes) => {
            if (typeof child === 'string') {
              const optionsCopy: OptionsState = optionsState
              if (isArrayType) {
                optionsCopy[child] = removeDuplicatesByProperty(
                  [...optionsState[child], ...changedFieldOptionRelationsData],
                  valueKey
                )
              } else {
                optionsCopy[child] = removeDuplicatesByProperty(changedFieldOptionRelationsData, valueKey)
              }
              setOptionsState(optionsCopy)
            }
          })
        }
      }
    }
  }

  // Below Function is Fields Error Displayer With Toast When MessageType Set To Toast
  const toastValidationDisplayer = async (values: FormikValues) => {
    await validation.validate(values, { abortEarly: false }).catch((errors: any) => {
      // The data is invalid
      // You can map errors to customize error messages
      const ErrMessage: string[] = []
      errors.inner.forEach((error: any) => {
        const errMessage = error.message
        ErrMessage.push(errMessage)
      })

      notification.error({
        message: toastErrObj?.title,
        description: ErrMessage.map((el, idx) => (
          <p key={idx} className={toastErrObj?.paragraphClassName}>
            {el}
          </p>
        )),
        className: toastErrObj?.className
      })
    })
  }

  // Bellow Function Return HandleSubmit , Based On Static OR Value Conditional
  const handleSubmitJSXhandler = (): ReactNode => {
    if (handleSubmit) {
      if (typeof handleSubmit === 'function') {
        const returnedSubmitOBJ: HandleSubmitObj = handleSubmit(formikValues)
        if (returnedSubmitOBJ) {
          const handleSubmitButton: ReactNode = (
            <Button
              onClick={async () => {
                //Cleanign null and "" from values object for exact error message
                const cleanedValues = Object.fromEntries(
                  Object.entries(formikValues).filter(
                    ([key, value]) => key !== null && value !== null && value !== '' && formikProps?.value?.length !== 0
                  )
                )
                formikProps?.setValues(cleanedValues)

                formikProps?.handleSubmit()
                if (errMessageType === 'Toast') {
                  await toastValidationDisplayer(cleanedValues)
                }
              }}
              loading={isLoading}
              className={returnedSubmitOBJ.className}
            >
              {returnedSubmitOBJ.text}
            </Button>
          )

          return handleSubmitButton
        }
      } else {
        const handleSubmitButton: ReactNode = (
          <Button
            onClick={async () => {
              //Cleanign null and "" from values object for exact error message
              const cleanedValues = Object.fromEntries(
                Object.entries(formikValues).filter(([key, value]) => key !== null && value !== null && value !== '')
              )
              formikProps?.setValues(cleanedValues)

              formikProps?.handleSubmit()
              if (errMessageType.toLowerCase() === 'toast') {
                await toastValidationDisplayer(cleanedValues)
              }
            }}
            loading={isLoading}
            className={handleSubmit.className}
          >
            {handleSubmit.text}
          </Button>
        )

        return handleSubmitButton
      }
    }
  }

  // Bellow Function Return HandleCanel , Based On Static OR Value Conditional

  const handleCancelJSXhandler = (): ReactNode => {
    if (handleCancel) {
      if (typeof handleCancel === 'function') {
        const returnedCancelOBJ: HandleCancelObj = handleCancel(formikValues)
        if (returnedCancelOBJ) {
          const handleCancelButton: ReactNode = (
            <Button
              onClick={() => {
                returnedCancelOBJ.handler({ ...formikProps, values: formikValues })
              }}
              className={returnedCancelOBJ.className}
            >
              {returnedCancelOBJ.text}
            </Button>
          )

          return handleCancelButton
        }
      } else {
        const handleCancelButton: ReactNode = (
          <Button
            onClick={() => {
              handleCancel.handler({ ...formikProps, values: formikValues })
            }}
            className={handleCancel.className}
          >
            {handleCancel.text}
          </Button>
        )

        return handleCancelButton
      }
    }
  }

  useEffect(() => {
    handleNonRelationFieldsOptions()
  }, [
    fields
      .map((field: any) => {
        if (field.options) {
          return JSON.stringify(field.options)
        }
      })
      .join(' ')
  ])

  useEffect(() => {
    useEffectFuncHandler()
  }, [_fields])

  useEffect(() => {
    if (typeof validation !== 'function') {
      setRecievedValidationSchema(validation)
    }
  }, [validation])

  useEffect(() => {
    setFields(fields)
  }, [fields])

  useEffect(() => {
    handlePropsValueChange()
  }, [formikValues])

  return (
    <Formik
      initialValues={initState}
      enableReinitialize={true}
      validationSchema={recievedValidationSchema && recievedValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async values => {
        if (handleSubmit) {
          if (typeof handleSubmit === 'function') {
            setIsLoading(true)
            const returnedSubmitOBJ: HandleSubmitObj = handleSubmit(values)
            await returnedSubmitOBJ.handler({ ...formikProps, values: formikValues })

            setIsLoading(false)
          } else {
            setIsLoading(true)
            await handleSubmit.handler({ ...formikProps, values: formikValues })

            setIsLoading(false)
          }
          setIsEditInited(false)
        }
      }}
    >
      {props => {
        const { values, setFieldValue, setErrors, errors } = props

        return (
          <>
            <HellanBaba />
            <div className='d-flex flex-wrap  my-2'>
              {_fields.map(el =>
                FieldsGenerator(
                  el,
                  fieldsChangeHandler,
                  optionsState,
                  loadingState,
                  errMessageType,
                  setFieldValue,
                  arrayTypeDeSelectHandler,
                  filesChangeHandler,
                  values,
                  errors,
                  setErrors,
                  optionalFieldDeleteAllHandler,
                  formikProps
                )
              )}
            </div>
            <div className={footerClassName}>
              {handleCancelJSXhandler()}
              {handleSubmit && handleSubmitJSXhandler()}
            </div>
          </>
        )
      }}
    </Formik>
  )
}
