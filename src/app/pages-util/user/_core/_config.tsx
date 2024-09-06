import { getAllItemCategories, getAllRoles } from "./_crud";
import { Tag, notification } from "antd";
import React from "react";
import {
  fetcher,
  get_column_search_props,
  setter,
} from "../../../modules/_functions";
import { T_fetched_user } from "./_type";
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
export const options_core: Record<any, any> = {
  roleId: {
    fetcher: async (
      token: string,
      options: Record<string, any[]>,
      optionsSetter: React.Dispatch<
        React.SetStateAction<Record<string, any[]>>
      >,
      params: any,
      keepSelected: boolean
    ) => {
      const VALUE = "id";
      const LABEL_1 = "name";

      params.limit = 10;
      params.page = 1;

      const res = await getAllRoles(token, { ...params });

      fetcher(
        res,
        options,
        optionsSetter,
        keepSelected,
        VALUE,
        LABEL_1,
        "roleId"
      );
    },
    setter: (
      options: Record<string, any[]>,
      optionsSetter: React.Dispatch<
        React.SetStateAction<Record<string, any[]>>
      >,
      value: string | any[]
    ) => {
      setter(options, optionsSetter, value, "roleId");
    },
  },
};

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
}): ColumnsType<T_fetched_user> => {
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
      ...columnBaseProps("phoneNumber", "شماره همراه"),

      ...get_column_search_props(
        "Input",
        values["phoneNumber"],
        (e) => changes["phoneNumber"](e.target.value),
        undefined,
        stringSearchATTRS("شماره همراه")
      ),
      render: (value) => {
        return optionalDataDisplay(value, "ناموجود");
      },
    },
    {
      ...columnBaseProps("email", "ایمیل"),

      ...get_column_search_props(
        "Input",
        values["email"],
        (e) => changes["email"](e.target.value),
        undefined,
        stringSearchATTRS("ایمیل")
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
  token,
  options,
  optionsSetter,
  exclusiveChange,
  isPSW,
  isEdit,
}: {
  token: string;
  options: Record<string, any[]>;
  optionsSetter: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
  exclusiveChange: Record<keyof T_fetched_user, any>;
  isPSW: boolean;
  isEdit: boolean;
}) => {
  const email: _Field<"TextField"> = create_text_field_attrs(
    "email",
    "ltr",
    "ایمیل",
    {
      ...srpba_css_template(),
      parentClassName: "col-12 col-md-4 p-1",
    }
  );


  const phoneNumber: _Field<"TextField"> = create_text_field_attrs(
    "phoneNumber",
    "ltr",
    "شماره همراه",
    {
      ...srpba_css_template(),
      parentClassName: "col-12 col-md-4 p-1",
    }
  );

  const password: _Field<"TextField"> = create_text_field_attrs(
    "password",
    "ltr",
    "رمزعبور",
    {
      ...srpba_css_template(),
      parentClassName: "col-12 col-md-4 p-1",
    }
  );


  const roleId: _Field<"Select"> = create_online_select(
    "roleId",
    (value: any) =>
      options_core["roleId"].fetcher(
        token,
        options,
        optionsSetter,
        { name: value },
        true
      ),
    "rtl",
    "نقش",
    {
      ...srpba_css_template(),
      LabelKey: "opt_label",
      ValueKey: "opt_value",
      options: options["roleId"] || [],
      parentExitFunction: {
        onChange: (props) => {
          const value = props.values.itemCategoryId;
          if (!value) {
            options_core["roleId"].fetcher(
              token,
              options,
              optionsSetter,
              undefined,
              false
            );
          } else {
            exclusiveChange["roleId"](value);
          }
        },
      },
    }
  );
  
  let ret = [email,roleId];


  if(!isEdit){
    ret.push(phoneNumber)
  }


  if (isPSW) {
    ret.push(password);
  }

  return ret;
};
