import { getAllItemCategories } from "./_crud";
import { Tag, notification } from "antd";
import React from "react";
import {
  fetcher,
  get_column_search_props,
  setter,
} from "../../../modules/_functions";
import { T_fetched_discount } from "./_type";
import {
  columnBaseProps,
  formatFloat,
  numberSearchATTRS,
  optionalDataDisplay,
  socialMediaSearchATTRS,
  stringSearchATTRS,
} from "../../../modules/table/_functions";
import { _Field } from "../../../modules/form-generator/modules/Core/_models";
import Switch from "../../../modules/fields/Switch";
import {
  create_numeric_field_attrs,
  create_online_select,
  create_text_area,
  create_text_field_attrs,
  srpba_css_template,
} from "../../../modules/fields/_functions";
import { ColumnsType } from "antd/es/table";

/* Below Object Is An Structure For Fetching Multi Option Field's Options 
  That Used In Both Table And Modal Fields 
  Each Field Get Query Params From Fetcher Params And Define Id And Label Keys
  And Pass Api Result And ID AND LABEL Keys And Options And OptionsSetter To Main Fetcher Function
  For Options Handle
*/
export const options_core: Record<any, any> = {};

/* Create Columns And Its Search Fields */
export const columns = ({
  values,
  changes,
  options,
  searchs,
  actions,
}: {
  values: Record<any, any>;
  changes: Record<any, any>;
  options: Record<string, any[]>;
  searchs: Record<any, any>;
  actions?: any;
}): ColumnsType<T_fetched_discount> => {
  return [
    {
      ...columnBaseProps("id", "شناسه"),

      ...get_column_search_props(
        "NumericInput",
        values["id"],
        (e) => changes["id"](e),
        undefined,
        numberSearchATTRS("شناسه")
      ),
    },
    {
      ...columnBaseProps("percentage", "درصد تخفیف"),

      ...get_column_search_props(
        "NumericInput",
        values["percentage"],
        (e) => changes["percentage"](e),
        undefined,
        numberSearchATTRS("درصد تخفیف")
      ),
    },
    {
      ...columnBaseProps("code", "کد تخفیف"),

      ...get_column_search_props(
        "Input",
        values["code"],
        (e) => changes["code"](e.target.value),
        undefined,
        stringSearchATTRS("کد تخفیف")
      ),
      render: (value) => {
        return optionalDataDisplay(value, "ناموجود");
      },
    },
    {
      ...columnBaseProps("till", "مدت زمان اعتبار"),

      ...get_column_search_props(
        "FaDatePicker",
        values["till"],
        (e) => changes["till"](e.target.value),
        undefined,
        stringSearchATTRS("مدت زمان اعتبار")
      ),
      render: (value) => {
        return optionalDataDisplay(value, "ناموجود");
      },
    },

    {
      ...columnBaseProps("action", "عملیات"),
      fixed: "left",
      width: "14rem",
      render: actions,
    },
  ];
};

/* Create Form Via Passed Params To Function */
export const fields = ({
  options,
  optionsSetter,
  exclusiveChange,
}: {
  options: Record<string, any[]>;
  optionsSetter: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
  exclusiveChange: Record<keyof T_fetched_discount, any>;
}) => {
  const percentage: _Field<"TextField"> = create_text_field_attrs(
    "percentage",
    "ltr",
    "درصد تخفیف",
    {
      ...srpba_css_template(),
      parentClassName: "col-12 col-md-4 p-1",
    }
  );

  const code: _Field<"TextField"> = create_text_field_attrs(
    "code",
    "ltr",
    "کد تخفیف",
    {
      ...srpba_css_template(),
      parentClassName: "col-12 col-md-4 p-1",
    }
  );

  const till: _Field<"FaDatePicker"> = {
    type: "FaDatePicker",
    name: "till",
    faDPmode: "Georgian",
    label: "مدت زمان اعتبار",
    parentClassName: "col-12 col-md-4 p-1",
    lableClassName: "labelz",
    minDate: { type: "Exact", value: { period: "Day", amount: 1 } },
  };

  return [percentage, code, till];
};
