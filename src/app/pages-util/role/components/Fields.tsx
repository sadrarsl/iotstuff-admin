import FormGenerator from "../../../modules/form-generator/modules/form-generator/FormGenerator";
import { fields, options_core } from "../_core/_config";
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
  token: string;
  validation?: object;
};

export default ({
  token,
  initState,
  footerClassName,
  handleCancel,
  handleSubmit,
  validation,
}: TFieldsProps): JSX.Element => {
  const [options, setOptions] = useState<Record<string, any[]>>({});

  // On Edit Multi Optional Field Value Fetched With These Keys
  const initOptionsFetchKeys: Record<any, any> = {
    itemCategoryId: "id",
  };

  // Fetch Table's Needed Search Field's Options
  const fetch_options = () => {
    const names = Object.keys(options_core);

    names.forEach(async (name: string) => {
      if (initState[name]) {
        if (typeof initState[name] === "object") {
          initState[name].forEach(async (element: any) => {
            await options_core[name].fetcher(
              token,
              options,
              setOptions,
              { [initOptionsFetchKeys[name]]: element },
              true
            );
            options_core[name].setter(options, setOptions, element);
            options_core[name].fetcher(token, options, setOptions, {}, true);
          });
        } else {
          await options_core[name].fetcher(
            token,
            options,
            setOptions,
            { [initOptionsFetchKeys[name]]: initState[name] },
            true
          );
          options_core[name].setter(options, setOptions, initState[name]);
          options_core[name].fetcher(token, options, setOptions, {}, true);
        }
      } else {
        options_core[name].fetcher(token, options, setOptions, {}, false);
      }
    });
  };

  useEffect(() => {
    // fetch_options();
  }, [JSON.stringify(initState)]);

  // On Multi Optional Fields Change We Mark Record In Options To Keep Even After Search
  const exclusiveChange: Record<any, any> = {
    itemCategoryId: (value: any) => {
      options_core["itemCategoryId"].setter(options, setOptions, value);
    },
  };

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
      fields={fields({
        token,
        options,
        optionsSetter: setOptions,
        exclusiveChange,
      })}
      initState={initState}
      errMessageType="Field"
    />
  );
};
