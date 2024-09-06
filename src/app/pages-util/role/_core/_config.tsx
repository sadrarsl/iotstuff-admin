const perOptions = [
  { en: "changepsw_user", fa: "تغییر رمز عبور کاربر" },
  { en: "all", fa: "همه" },
  { en: "read_discount", fa: "خواندن تخفیف" },
  { en: "create_discount", fa: "ایجاد تخفیف" },
  { en: "update_discount", fa: "به‌روزرسانی تخفیف" },
  { en: "delete_discount", fa: "حذف تخفیف" },
  { en: "read_gateway", fa: "خواندن درگاه" },
  { en: "create_gateway", fa: "ایجاد درگاه" },
  { en: "update_gateway", fa: "به‌روزرسانی درگاه" },
  { en: "delete_gateway", fa: "حذف درگاه" },
  { en: "read_gatewaytype", fa: "خواندن نوع درگاه" },
  { en: "create_gatewaytype", fa: "ایجاد نوع درگاه" },
  { en: "update_gatewaytype", fa: "به‌روزرسانی نوع درگاه" },
  { en: "delete_gatewaytype", fa: "حذف نوع درگاه" },
  { en: "read_item", fa: "خواندن آیتم" },
  { en: "create_item", fa: "ایجاد آیتم" },
  { en: "update_item", fa: "به‌روزرسانی آیتم" },
  { en: "delete_item", fa: "حذف آیتم" },
  { en: "read_itembextra", fa: "خواندن اطلاعات اضافی آیتم" },
  { en: "create_itembextra", fa: "ایجاد اطلاعات اضافی آیتم" },
  { en: "update_itembextra", fa: "به‌روزرسانی اطلاعات اضافی آیتم" },
  { en: "delete_itembextra", fa: "حذف اطلاعات اضافی آیتم" },
  { en: "read_itemcategory", fa: "خواندن دسته‌بندی آیتم" },
  { en: "create_itemcategory", fa: "ایجاد دسته‌بندی آیتم" },
  { en: "update_itemcategory", fa: "به‌روزرسانی دسته‌بندی آیتم" },
  { en: "delete_itemcategory", fa: "حذف دسته‌بندی آیتم" },
  { en: "read_itemextra", fa: "خواندن آیتم اضافی" },
  { en: "create_itemextra", fa: "ایجاد آیتم اضافی" },
  { en: "update_itemextra", fa: "به‌روزرسانی آیتم اضافی" },
  { en: "delete_itemextra", fa: "حذف آیتم اضافی" },
  { en: "read_order", fa: "خواندن سفارش" },
  { en: "create_order", fa: "ایجاد سفارش" },
  { en: "update_order", fa: "به‌روزرسانی سفارش" },
  { en: "delete_order", fa: "حذف سفارش" },
  { en: "read_orderitemextras", fa: "خواندن اطلاعات اضافی آیتم سفارش" },
  { en: "create_orderitemextras", fa: "ایجاد اطلاعات اضافی آیتم سفارش" },
  { en: "update_orderitemextras", fa: "به‌روزرسانی اطلاعات اضافی آیتم سفارش" },
  { en: "delete_orderitemextras", fa: "حذف اطلاعات اضافی آیتم سفارش" },
  { en: "read_orderitems", fa: "خواندن آیتم‌های سفارش" },
  { en: "create_orderitems", fa: "ایجاد آیتم‌های سفارش" },
  { en: "update_orderitems", fa: "به‌روزرسانی آیتم‌های سفارش" },
  { en: "delete_orderitems", fa: "حذف آیتم‌های سفارش" },
  { en: "read_pic", fa: "خواندن تصویر" },
  { en: "create_pic", fa: "ایجاد تصویر" },
  { en: "update_pic", fa: "به‌روزرسانی تصویر" },
  { en: "delete_pic", fa: "حذف تصویر" },
  { en: "read_role", fa: "خواندن نقش" },
  { en: "create_role", fa: "ایجاد نقش" },
  { en: "update_role", fa: "به‌روزرسانی نقش" },
  { en: "delete_role", fa: "حذف نقش" },
  { en: "read_rolepermission", fa: "خواندن مجوز نقش" },
  { en: "create_rolepermission", fa: "ایجاد مجوز نقش" },
  { en: "update_rolepermission", fa: "به‌روزرسانی مجوز نقش" },
  { en: "delete_rolepermission", fa: "حذف مجوز نقش" },
  { en: "read_shopsize", fa: "خواندن اندازه فروشگاه" },
  { en: "create_shopsize", fa: "ایجاد اندازه فروشگاه" },
  { en: "update_shopsize", fa: "به‌روزرسانی اندازه فروشگاه" },
  { en: "delete_shopsize", fa: "حذف اندازه فروشگاه" },
  { en: "read_sizesub", fa: "خواندن زیراندازه" },
  { en: "create_sizesub", fa: "ایجاد زیراندازه" },
  { en: "update_sizesub", fa: "به‌روزرسانی زیراندازه" },
  { en: "delete_sizesub", fa: "حذف زیراندازه" },
  { en: "read_user", fa: "خواندن کاربر" },
  { en: "create_user", fa: "ایجاد کاربر" },
  { en: "update_user", fa: "به‌روزرسانی کاربر" },
  { en: "delete_user", fa: "حذف کاربر" },
  { en: "read_userrole", fa: "خواندن نقش کاربر" },
  { en: "create_userrole", fa: "ایجاد نقش کاربر" },
  { en: "update_userrole", fa: "به‌روزرسانی نقش کاربر" },
  { en: "delete_userrole", fa: "حذف نقش کاربر" },
];

import { getAllItemCategories } from "./_crud";
import { Tag, notification } from "antd";
import React from "react";
import {
  fetcher,
  get_column_search_props,
  setter,
} from "../../../modules/_functions";
import { T_fetched_role } from "./_type";
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
  create_offine_multiselect,
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
}): ColumnsType<T_fetched_role> => {
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
  token,
  options,
  optionsSetter,
  exclusiveChange,
}: {
  token: string;
  options: Record<string, any[]>;
  optionsSetter: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
  exclusiveChange: Record<keyof T_fetched_role, any>;
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

  

  const pers: _Field<"MultiSelect"> = create_offine_multiselect(
    "permissions",
    "rtl",
    "دسترسی ها",
    {
      ...srpba_css_template(),

      ValueKey: "en",
      LabelKey: "fa",
      options: perOptions,
    }
  );

  return [name, pers];
};
