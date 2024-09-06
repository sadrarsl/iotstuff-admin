import { Button, ConfigProvider, Input, theme } from "antd";
import React from "react";

const { darkAlgorithm, defaultAlgorithm } = theme;

type search = {
  handleClearFilter: () => void;
  handleSearchData: (name: string, value: any) => void;
  searchData: Record<string, any>;
};

export default (props: search): JSX.Element => {
  const { handleClearFilter, handleSearchData, searchData } = props;

  const settings = { mode: "light" };

  return (
    <ConfigProvider
      theme={{
        algorithm: settings.mode === "dark" ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorBgContainer:
            settings.mode === "dark" ? "rgba(47, 51, 73, 0.95)" : "",
        },
      }}
    >
      <div className="col-12 d-flex flex-wrap p-1">
        <div className="col-12 col-md-9 p-1">

          <Input
            value={searchData?.search ? searchData?.search : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleSearchData("search", e.target.value);
            }}
            className="w-100"
            placeholder="جست و جو"
            allowClear
          />
        </div>
        <div className="col-12 col-md-3 p-1">
          <Button
            type="dashed"
            danger
            onClick={() => handleClearFilter()}
            className="w-100"
          >
            حذف فیلتر
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};
