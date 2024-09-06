import FormGenerator from "../../../modules/form-generator/modules/form-generator/FormGenerator";
import { fields } from "../_core/_config";
import { useEffect, useState } from "react";
import {
  HandleCancelObj,
  HandleSubmitObj,
} from "../../../modules/form-generator/modules/form-generator/_models";
import { FormikValues } from "formik";

type TFieldsProps = {
  initState: Record<any, any>;
  handleCancel?: HandleCancelObj | ((values: FormikValues) => HandleCancelObj);
  handleSubmit?: HandleSubmitObj | ((values: FormikValues) => HandleSubmitObj);
  footerClassName?: string;
  validation?: object;
};

export default ({
  initState,
  footerClassName,
  handleCancel,
  handleSubmit,
  validation,
}: TFieldsProps): JSX.Element => {
  const [options, setOptions] = useState<Record<string, any[]>>({});

  return (
    <FormGenerator
      footerClassName={footerClassName}
      handleCancel={handleCancel && handleCancel}
      handleSubmit={
        handleSubmit
          ? typeof handleSubmit === "function"
            ? (values) => handleSubmit(values)
            : handleSubmit
          : undefined
      }
      validation={validation}
      // Making Create And Edit Fields
      fields={fields({ options, optionsSetter: setOptions })}
      initState={initState}
      errMessageType="Field"
    />
  );
};
