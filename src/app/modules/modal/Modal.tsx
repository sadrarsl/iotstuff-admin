import React, { ReactNode } from "react";
import { Modal as AntdModal, ConfigProvider, theme } from "antd";
// import { useSettings } from 'src/@core/hooks/useSettings'

const { darkAlgorithm, defaultAlgorithm } = theme;
interface Props {
  open: boolean;
  handleClose: () => void;
  extraProps?: Record<string, any>;
  footer: ReactNode[];
  content: ReactNode;
}

const Modal: React.FC<Props> = ({
  open,
  handleClose,
  extraProps,
  footer,
  content,
}) => {
  const { settings } = { settings: { mode: "light" } };
  return (
    <ConfigProvider
      theme={{
        algorithm: settings.mode === "dark" ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorBgContainer:
            settings.mode === "dark" ? "rgba(47, 51, 73, 0.95)" : "#ffffff",
        },
      }}
    >
      <AntdModal
        zIndex={9998}
        visible={open}
        onCancel={handleClose}
        destroyOnClose
        footer={footer}
        {...extraProps}
      >
        {content}
      </AntdModal>
    </ConfigProvider>
  );
};

export default Modal;
