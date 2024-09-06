import { FieldsFormikProps } from "../_global/_models";
import { CustomCheckbox } from "../../CustomCheckbox/_models";

export interface Checkbox extends FieldsFormikProps, CustomCheckbox {
    value:any
    children:any
}
