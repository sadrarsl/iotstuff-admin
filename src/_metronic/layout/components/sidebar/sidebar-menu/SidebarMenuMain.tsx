import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem to="/orders" title="سفارشات" hasBullet={true} />

      <SidebarMenuItemWithSub
        to="/items"
        title="آیتم ها"
        fontIcon="bi-archive"
      icon="element-plus"
      >
        <SidebarMenuItem
          to="/itemCategory"
          title="دسته بندی آیتم ها"
          hasBullet={true}
        />

        <SidebarMenuItem to="/item" title="آیتم" hasBullet={true} />
        <SidebarMenuItem
          to="/itemExtra"
          title="آیتم های اضافی"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/itemBExtra"
          title="اتصال آیتم های اضافی"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/shop-setting"
        title="تنظیمات فروشگاه"
        fontIcon="bi-archive"
        icon="element-plus"
      >
        <SidebarMenuItem to="/user" title="مدیریت کاربران" hasBullet={true} />
        <SidebarMenuItem to="/role" title="مدیریت نقش ها" hasBullet={true} />
        <SidebarMenuItem to="/discount" title="کدهای تخفیف" hasBullet={true} />
        <SidebarMenuItem to="/gateways" title="درگاه ها" hasBullet={true} />
        <SidebarMenuItem
          to="/subscriptions"
          title="مدیریت تعرفه ها"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
    </>
  );
};

export { SidebarMenuMain };
