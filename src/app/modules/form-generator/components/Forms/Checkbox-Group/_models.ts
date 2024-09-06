import { Dispatch, SetStateAction } from "react";
import { CustomCheckboxGroup } from "../../CustomCheckboxGroup/_models";
import { FieldsFormikProps } from "../_global/_models";

export interface CheckboxGroup extends FieldsFormikProps, CustomCheckboxGroup {
  setFieldErr: Dispatch<SetStateAction<string | undefined>>;
  obj: any;
  value: any;
  children: any;
}
