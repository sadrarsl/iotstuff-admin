import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";
import ItemCategory from "../pages/itemCategory";
import ItemExtra from "../pages/itemExtra";
import User from "../pages/user";
import Role from "../pages/role";
import Discount from "../pages/discount";
import ItemBExtra from "../pages/itemBExtra";

const PrivateRoutes = () => {
  const Item = lazy(() => import("../pages/item"));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />

        <Route
          path="item"
          element={
            <SuspensedView>
              <Item />
            </SuspensedView>
          }
        />

        <Route
          path="itemCategory"
          element={
            <SuspensedView>
              <ItemCategory />
            </SuspensedView>
          }
        />

        <Route
          path="itemExtra"
          element={
            <SuspensedView>
              <ItemExtra />
            </SuspensedView>
          }
        />

        <Route
          path="user"
          element={
            <SuspensedView>
              <User />
            </SuspensedView>
          }
        />

        <Route
          path="role"
          element={
            <SuspensedView>
              <Role />
            </SuspensedView>
          }
        />

        <Route
          path="discount"
          element={
            <SuspensedView>
              <Discount />
            </SuspensedView>
          }
        />

        <Route
          path="itemBExtra"
          element={
            <SuspensedView>
              <ItemBExtra />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
