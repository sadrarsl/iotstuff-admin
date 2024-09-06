import { getAllItemCategories } from "./_crud";
import { Tag, notification } from "antd";
import React from "react";
import {
  fetcher,
  get_column_search_props,
  setter,
} from "../../../modules/_functions";
import { T_fetched_itemCategory } from "./_type";
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
}): ColumnsType<T_fetched_itemCategory> => {
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
      ...columnBaseProps("name", "نام"),

      ...get_column_search_props(
        "Input",
        values["name"],
        (e) => changes["name"](e.target.value),
        undefined,
        stringSearchATTRS("نام")
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
  exclusiveChange: Record<keyof T_fetched_itemCategory, any>;
}) => {
  const name: _Field<"TextField"> = create_text_field_attrs(
    "name",
    "rtl",
    "نام",
    {
      ...srpba_css_template(),
      parentClassName: "col-12 col-md-4 p-1",
    }
  );

  return [name];
};
