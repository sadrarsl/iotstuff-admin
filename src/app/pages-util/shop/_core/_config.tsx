import { Tag, notification } from "antd";
import React from "react";
import {
  fetcher,
  get_column_search_props,
  setter,
} from "../../../modules/_functions";
import { T_fetched_item } from "./_type";
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


/* Create Columns And Its Search Fields */
export const columns = ({
  values,
  changes,
  options,
  searchs,
  actions,
}: {
  values: Record<keyof T_fetched_item, any>;
  changes: Record<keyof T_fetched_item, any>;
  options: Record<string, any[]>;
  searchs: Record<keyof T_fetched_item, any>;
  actions?: any;
}): ColumnsType<T_fetched_item> => {
  return [
    {
      ...columnBaseProps("name", "name"),

      ...get_column_search_props(
        "Input",
        values["name"],
        (e) => changes["name"](e),
        undefined,
        numberSearchATTRS("name")
      ),
    },
    {
      ...columnBaseProps("id", "شناسه"),

      ...get_column_search_props(
        "Input",
        values["name"],
        (e) => changes["name"](e),
        undefined,
        numberSearchATTRS("name")
      ),
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
  exclusiveChange?: Record<keyof T_fetched_item, any>;
}) => {
  const name: _Field<"TextField"> = create_text_field_attrs(
    "name",
    "ltr",
    "name",
    {
      ...srpba_css_template(),
    }
  );

  const location: _Field<"TextField"> = create_text_field_attrs(
    "location",
    "ltr",
    "location",
    {
      ...srpba_css_template(),
    }
  );

  return [name, location];
};
