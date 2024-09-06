import { Dispatch, SetStateAction } from "react";
import { CustomRadioGroup } from "../../CustomRadioGroup/_models";
import { FieldsFormikProps } from "../_global/_models";

export interface Radio extends FieldsFormikProps, CustomRadioGroup {
  setFieldErr: Dispatch<SetStateAction<string | undefined>>;
  obj: any;
  value:any
}
