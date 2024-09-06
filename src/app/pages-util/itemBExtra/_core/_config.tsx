import {  getAllItemExtras, getAllItems } from "./_crud";
import { Button, Tag, notification } from "antd";
import React, { useCallback } from "react";
import {
  fetcher,
  get_column_search_props,
  setter,
} from "../../../modules/_functions";
import { T_fetched_itemBExtra } from "./_type";
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
  create_online_multiselect,
  create_online_select,
  create_text_area,
  create_text_field_attrs,
  srpba_css_template,
} from "../../../modules/fields/_functions";
import { ColumnsType } from "antd/es/table";
import ItemBExtra from "../components/ItemBExtra";

/* Below Object Is An Structure For Fetching Multi Option Field's Options 
  That Used In Both Table And Modal Fields 
  Each Field Get Query Params From Fetcher Params And Define Id And Label Keys
  And Pass Api Result And ID AND LABEL Keys And Options And OptionsSetter To Main Fetcher Function
  For Options Handle
*/
export const options_core: Record<any, any> = {
  itemExtra: {
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

      const res = await getAllItemExtras(token, { ...params });

      fetcher(
        res,
        options,
        optionsSetter,
        keepSelected,
        VALUE,
        LABEL_1,
        "itemExtra"
      );
    },
    setter: (
      options: Record<string, any[]>,
      optionsSetter: React.Dispatch<
        React.SetStateAction<Record<string, any[]>>
      >,
      value: string | any[]
    ) => {
      setter(options, optionsSetter, value, "itemExtra");
    },
  },
  itemId: {
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

      const res = await getAllItems(token, { ...params });

      fetcher(
        res,
        options,
        optionsSetter,
        keepSelected,
        VALUE,
        LABEL_1,
        "itemId"
      );
    },
    setter: (
      options: Record<string, any[]>,
      optionsSetter: React.Dispatch<
        React.SetStateAction<Record<string, any[]>>
      >,
      value: string | any[]
    ) => {
      setter(options, optionsSetter, value, "itemId");
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
}): ColumnsType<T_fetched_itemBExtra> => {
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
      ...columnBaseProps("quantity", "تعداد موجود"),

      ...get_column_search_props(
        "NumericInput",
        values["quantity"],
        (e) => changes["quantity"](e),
        undefined,
        numberSearchATTRS("تعداد موجود")
      ),
    },
    {
      ...columnBaseProps("price", "قیمت"),

      ...get_column_search_props(
        "NumericInput",
        values["price"],
        (e) => changes["price"](e),
        undefined,
        numberSearchATTRS("قیمت")
      ),
      render: (value) => {
        return optionalDataDisplay(value, "ناموجود");
      },
    },
    {
      ...columnBaseProps("endedPrice", "قیمت تمام شده"),

      ...get_column_search_props(
        "NumericInput",
        values["endedPrice"],
        (e) => changes["endedPrice"](e),
        undefined,
        numberSearchATTRS("قیمت تمام شده")
      ),
      render: (value) => {
        return optionalDataDisplay(value, "ناموجود");
      },
    },
    {
      ...columnBaseProps("extraPackagingCost", "هزینه اضافی بسته بندی"),

      ...get_column_search_props(
        "NumericInput",
        values["extraPackagingCost"],
        (e) => changes["extraPackagingCost"](e),
        undefined,
        numberSearchATTRS("هزینه اضافی بسته بندی")
      ),
      render: (value) => {
        return optionalDataDisplay(value, "ناموجود");
      },
    },

    {
      ...columnBaseProps("itemBExtraCategoryId", "دسته بندی آیتم"),
      ...get_column_search_props(
        "Select",
        values["itemBExtraCategoryId"],
        (value) => value && changes["itemBExtraCategoryId"](value),
        (value) => searchs["itemBExtraCategoryId"](value),
        stringSearchATTRS("دسته بندی آیتم"),

        options["itemBExtraCategoryId"] || []
      ),
      render: (value, record: any) => {
        const display_name = `${record?.ItemCategory?.name}`;

        return <b>{display_name}</b>;
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
}: {
  token: string;
  options: Record<string, any[]>;
  optionsSetter: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
  exclusiveChange: Record<keyof T_fetched_itemBExtra, any>;
}) => {
  const itemId: _Field<"Select"> = create_online_select(
    "itemId",
    (value: any) =>
      options_core["itemId"].fetcher(
        token,
        options,
        optionsSetter,
        { name: value },
        true
      ),
    "rtl",
    " آیتم",
    {
      ...srpba_css_template(),
      LabelKey: "opt_label",
      ValueKey: "opt_value",
      options: options["itemId"] || [],
      parentExitFunction: {
        onChange: (props) => {
          console.log("props", props);
          const value = props.values.itemId;
          if (!value) {
            options_core["itemId"].fetcher(
              token,
              options,
              optionsSetter,
              undefined,
              false
            );  
          } else {
            exclusiveChange["itemId"](value);
          }
        },
      },
    }
  );

  const itemExtra: _Field<"MultiSelect"> = create_online_multiselect(
    "itemExtra",
    (value: any) =>
      options_core["itemExtra"].fetcher(
        token,
        options,
        optionsSetter,
        { name: value },
        true
      ),
    "rtl",
    "آیتم های اضافی",
    {
      ...srpba_css_template(),
      LabelKey: "opt_label",
      ValueKey: "opt_value",
      options: options["itemExtra"] || [],
      parentExitFunction: {
        onChange: (props) =>
          useCallback(
            (props: any) => {
              const value = props.values.itemExtra;
              const itemExtras = props.values.itemExtras || {};
              console.log("itemExtras", value);
              value.forEach((el: any) => {
                if (!itemExtras[el]) {
                  itemExtras[el] = {
                    id: el,
                    name:
                      options["itemExtra"].find((le) => le.opt_value === el)[
                        "opt_label"
                      ] || undefined,
                    min: 1,
                    max: 1,
                  };
                }
              });

              console.log("itemExtras", itemExtras);

              props.setFieldValue("itemExtras", itemExtras);
            },
            [
              props.values.itemExtra,
              props.values.itemExtras,
              props.setFieldValue,
            ] // dependencies
          ),
      },
    }
  );

 

  return [itemId, itemExtra];
};
