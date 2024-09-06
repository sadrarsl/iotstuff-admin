import React, { ReactNode, useEffect, useState } from "react";

import {
  Button,
  Card,
  ConfigProvider,
  Divider,
  FloatButton,
  notification,
  theme,
} from "antd";
import { AxiosResponse } from "axios";
// import Search from "src/pages-util/itemBExtra/components/Search";
import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";

import { FormikValues } from "formik";
import {
  T_fetched_itemBExtra,
  T_itemBExtra_search,
} from "../../pages-util/itemBExtra/_core/_type";
import {
  delete_itemBExtra,
  fetch_all_itemBExtra,
  post_itemBExtra,
  update_itemBExtra,
} from "../../pages-util/itemBExtra/_core/_crud";
import {
  filled_data_validation,
  is_fetched_data_valid,
  is_filled_data_valid,
  is_filled_data_valid_edit,
} from "../../pages-util/itemBExtra/_core/_validator";
import { columns, options_core } from "../../pages-util/itemBExtra/_core/_config";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import {
  HandleCancelObj,
  HandleSubmitObj,
} from "../../modules/form-generator/modules/form-generator/_models";
import { useAuth } from "../../modules/auth";
import Search from "../../pages-util/itemBExtra/components/Search";
import Table from "../../modules/table/Table";
import Modal from "../../modules/modal/Modal";
import Fields from "../../pages-util/itemBExtra/components/Fields";

const { defaultAlgorithm, darkAlgorithm } = theme;

export default (): ReactNode => {
  const auth = useAuth();

  // Declared To Hold Page's Main Data
  const [data, setData] = useState<T_fetched_itemBExtra[]>([]);
  // Declared To Hold Table's Searched Data
  const [searchData, setSearchData] = useState<T_itemBExtra_search>({});
  // Declared To Hold Table's Search Fields Options
  const [searchOptions, setSearchOptions] = useState<Record<string, any[]>>({});
  // Declared To Hold Table's Loading Status During Data Fetching
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Declare Create And Edit Modal Show Status
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [initState, setInitState] = useState<Record<string, any>>({
    is_active: "1",
  });
  // Declared To Hold Will Be Deleted Record
  const [deleteState, setDeleteState] = useState<Record<string, any>>({});
  // Declare Delete Confirmation's Modal Show Status
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  // Declared To Hold Table's Server Side Pagination Variables
  const [pagination, setPagination] = useState<{
    limit: number;
    offset: number;
    total?: number;
  }>({
    offset: 1,
    limit: 10,
  });

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isPut, setIsPut] = useState<boolean>(false);

  const TOKEN = auth.auth?.token || "";

  // True And False Switcher For When Table Pagination Changed , True In Action And False In UseEffect After Operation

  const [isPaginationChanged, setIsPaginationChanged] =
    useState<boolean>(false);

  // Declare Form's Current Operation , If There Was Id It Means Record Has Been Created And Its Edit Otherwise Its Create
  const isEdit: boolean = initState?.id ? true : false;
  // Declare Instance Name To Show In Toasts And Modals And Table
  const instanceName = "آیتم";
  const modelName = "itemBExtra";

  useEffect(() => {
    setIsRead(auth.searchPermission(`read_${modelName}`));
    setIsCreate(auth.searchPermission(`create_${modelName}`));
    setIsPut(auth.searchPermission(`update_${modelName}`));
    setIsDelete(auth.searchPermission(`delete_${modelName}`));
  }, [auth.currentUser?.permissions]);

  /* Below Function Fetchs Data And If There Was Related Object Extract
   All Needed Data Via data_extractor Function 
   **(If There Was Not Related Object It Would Pass Raw Data For Validation)**
    And Pass To is_fetched_data_valid To Validate Data 
  Then If Data Was Correct It Would Pass Data to setData Else Will Pass [] To setData And Show Failure Toast */
  const fetch_data = (searchParams?: T_itemBExtra_search) => {
    setIsLoading(true);
    if (isRead) {
      fetch_all_itemBExtra(TOKEN, {
        ...searchParams,
        limit: pagination.limit,
        page: pagination.offset,
      })
        .then((res: AxiosResponse) => {
          const data: unknown = res.data?.rows;
          const is_data_valid = is_fetched_data_valid(data);

          setPagination((pagz) => ({ ...pagz, total: res.data.count }));

          if (data) {
            if (is_data_valid) {
              setData(data);
            } else {
              setData([]);
              notification.error({
                message: "داده دریافت شده صحیح نمیباشد",
              });
            }
          } else {
            setData([]);
          }

          setIsLoading(false);
        })
        .catch(() => {
          setData([]);
          setPagination((pagz) => ({ ...pagz, total: 0 }));

          notification.error({
            message: "خطای ارتباط با سرور",
          });
          setIsLoading(false);
        });
    }

    setIsLoading(false);
  };
  console.log("op", searchOptions);
  // Fetch Table's Needed Search Field's Options
  const fetch_options = () => {
    const names = Object.keys(options_core);
    names.forEach((name: string) => {
      options_core[name].fetcher(
        TOKEN,
        searchOptions,
        setSearchOptions,
        {},
        false
      );
    });
  };

  useEffect(() => {
    fetch_data();
    fetch_options();
  }, [isRead]);

  /* This useEffect Will Called 400ms After searchData Change 
  **(Due TextField Searchs We Used useDebounce)**
   And Fetch Data With Searched Params */
  useEffect(() => {
    fetch_data(searchData);
  }, [JSON.stringify(useDebounce(searchData, 400)[0])]);

  // If Pagination Varible Has Been Changed This UseEffect Would Have Called And Fetch Data With New Pagination
  useEffect(() => {
    if (isPaginationChanged) {
      fetch_data(searchData);
      setIsPaginationChanged(false);
    }
  }, [isPaginationChanged]);

  /* Below Function Set Will Be Searched Data (RAW , There Is No Null Value) In searchData State  
  And Reset Pagination Variables And If Data Was For A Multi Optional Field It Will Marked In Field's Related Object
   In searchOptions To Record Don't Clear On Fields Search
  */
  const handleSearchData = (name: string, value: any) => {
    if (name === "itemId" || name === "itemExtra") {
      options_core[name].setter(searchOptions, setSearchOptions, value);
    }
    setPagination({ limit: 10, offset: 1 });
    setSearchData((searchData: object) =>
      Object.fromEntries(
        Object.entries({ ...searchData, [name]: value }).filter(
          ([key, value]) => key !== null && value
        )
      )
    );
  };

  // Set Will Deleted Record And Open Delete Confirmation Modal
  const handleDeleteOpen = (deleteData: object) => {
    setDeleteState(deleteData);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    // Set Delete State Empty And Close Delete Confirmation Modal
    setDeleteState({});
    setDeleteOpen(false);
  };

  // Clear Create And Edit Modal State And Close Create And Edit Modal
  const handleModalClose = () => {
    setModalOpen(false);
    setInitState({});
  };

  // Open Create And Edit Modal And If There Was Exicting Data Would Set It In initState
  const handleModalOpen = (editData?: object) => {
    if (editData) {
      setInitState(editData);
    }
    setModalOpen(true);
  };

  // Handle Multi Option Field's Search
  const handleSearchOption = useDebouncedCallback(
    (name: "itemId" | 'itemExtra' , value: any) => {
      options_core[name].fetcher(
        TOKEN,
        searchOptions,
        setSearchOptions,
        { name: value },
        true
      );
    },
    500
  );

  // Clear Filter Button's Function
  const handleClearFilter = () => {
    setPagination({ limit: 10, offset: 0 });
    setSearchData({});
  };

  // Table Search's Multi Optional Fields Search Object
  const searchs = {
    itemId: (value: any) => handleSearchOption("itemId", value),
    itemExtra: (value: any) => handleSearchOption("itemExtra", value),
  };

  // Table Search's Fields Changes Handler
  const changes = {
    itemId: (value: any) => handleSearchData("itemId", value),
    itemExtra: (value: any) => handleSearchData("itemExtra", value),
    id: (value: any) => handleSearchData("id", value),
    
  };

  // Create And Edit Modal Cancel Button Properties That Reset initState And Close Modal
  const cancelButton: HandleCancelObj = {
    className: "col-12 col-md-4 col-lg-2 ant-btn-dangerous",
    handler: (props) => {
      const { handleReset } = props;
      handleReset();
      setModalOpen(false);
      setInitState({ is_active: "1" });
    },
    text: "انصراف",
  };

  /* Create And Edit Modal Submit Button Properties
    Validate Filled Data And IF IT Was Edit Pass Data To Edit Api Else To Create Api
  */
  const submitButton = (values: FormikValues): HandleSubmitObj => {
    return {
      className: "col-12 col-md-4 col-lg-2 ant-btn-primary",
      handler: (props) => {
        const { values, handleReset,setValues } = props;
        const cleanedValues = Object.fromEntries(
          Object.entries(values).filter(([key, value]) => key !== null && value !== null && value !== '')
        )
        setValues(cleanedValues)
        const isEdit: boolean = values?.id ? true : false;

        if(values.itemExtra){
          // values.itemExtras = values.itemExtra.map((el:any) => ({
          //   id:el,
          //   name:Options['itemExtra']
          // }))
        }

        if (isEdit) {
          if (is_filled_data_valid_edit(values)) {
            const id: number = values?.id;

            update_itemBExtra(TOKEN, id, values)
              .then(() => {
                notification.success({
                  message: ` ${instanceName} ویرایش شد `,
                });

                handleReset();
                setModalOpen(false);
                fetch_data(searchData);
              })
              .catch(() => {
                notification.error({ message: ` ${instanceName} ویرایش نشد ` });

                handleReset();
                setModalOpen(false);
              });
          }
        } else {
          if (is_filled_data_valid(values)) {
            post_itemBExtra(TOKEN, values)
              .then(() => {
                notification.success({ message: `${instanceName}  ایجاد شد ` });

                handleReset();
                setModalOpen(false);
                fetch_data(searchData);
              })
              .catch(() => {
                notification.error({ message: ` ${instanceName} ایجاد نشد ` });

                handleReset();
                setModalOpen(false);
              });
          }
        }
        setInitState({});
      },
      text: values?.id ? "ویرایش" : "ثبت",
    };
  };

  // Table's Action Columns
  const actionColumn = (_: any, record: any) => (
    <div className="d-flex gap-2 flex-wrap w-100 col-12">
      {isPut ? (
        <Button
          className="col-12 col-md-6 w-100"
          type="text"
          onClick={() => {
            handleModalOpen(record);
          }}
        >
          ویرایش
        </Button>
      ) : null}
      {isDelete ? (
        <Button
          type="text"
          className="col-12 col-md-6 w-100"
          onClick={() => {
            handleDeleteOpen(record);
          }}
        >
          حذف
        </Button>
      ) : null}
    </div>
  );

  // Delete Modal Confirmation Function
  const handleDelete = (id: number | any) => {
    if (isDelete) {
      delete_itemBExtra(TOKEN, id)
        .then(() => {
          notification.success({ message: `${instanceName} با موفقیت حذف شد` });
          fetch_data(searchData);
        })
        .catch(() => {
          notification.error({ message: "خطای در ارتباط با سرور" });
        });
    }
    handleDeleteClose();
  };

  const deleteModalFooter = (
    <div className="d-flex flex-wrap justify-content-end gap-2">
      <Button onClick={handleDeleteClose} className="col-12 col-md-4 col-lg-2">
        انصراف
      </Button>
      <Button
        className="col-12 col-md-4 col-lg-2 ant-btn-dangerous"
        onClick={() => {
          handleDelete(deleteState?.id);
        }}
      >
        حذف
      </Button>
    </div>
  );

  return (
    <div className="container">
      <div className="col-12">
        <Card>
          {/* <Search
            handleClearFilter={handleClearFilter}
            handleSearchData={handleSearchData}
            searchData={searchData}
          />  */}

          {isRead ? (
            <Table
              data={data}
              loading={isLoading}
              // create tables columns (data and search)
              columns={columns({
                values: searchData,
                changes,
                options: searchOptions,
                searchs,
                actions: actionColumn,
              })}
              tableProps={{
                pagination: {
                  current: pagination.offset + 1,
                  pageSize: pagination.limit,
                  total: pagination?.total || 0,
                  onChange: (page: any, pageSize: any) => {
                    setIsPaginationChanged(true);
                    setPagination((pagz) => ({
                      ...pagz,
                      offset: page - 1,
                      limit: pageSize,
                    }));
                  },
                  onShowSizeChange: (page: any, pageSize: any) => {
                    setIsPaginationChanged(true);

                    setPagination((pagz) => ({
                      ...pagz,
                      offset: page - 1,
                      limit: pageSize,
                    }));
                  },
                  locale: { itemBExtras_per_page: instanceName },
                  itemBExtraRender: (page: any, type: any, originalElement: any) => {
                    switch (type) {
                      case "prev":
                        return <RightOutlined />;
                      case "next":
                        return <LeftOutlined />;
                      default:
                        return originalElement;
                    }
                  },
                },
              }}
            />
          ) : (
            <span className="text-danger">شما به این صفحه دسترسی ندارید</span>
          )}
        </Card>
      </div>
      {isCreate ? (
        <FloatButton
          shape="circle"
          type="primary"
          style={{ left: 70, bottom: 25, width: "3.4rem", height: "3.4rem" }}
          icon={<PlusOutlined style={{ fontSize: "1rem" }} />}
          onClick={() => handleModalOpen()}
        />
      ) : null}
      {isPut || isCreate ? (
        <Modal
          open={modalOpen}
          footer={[<></>]}
          extraProps={{
            width: "98%",
            centered: true,
          }}
          handleClose={handleModalClose}
          content={
            <div>
              <h4 className="text-center">
                {isEdit ? "ویرایش" : "ایجاد"} {instanceName}
              </h4>
              <Divider />
              <Fields
                token={auth.auth?.token || ""}
                initState={initState}
                handleCancel={cancelButton}
                validation={filled_data_validation}
                handleSubmit={submitButton}
                footerClassName="d-flex flex-wrap justify-content-end gap-2"
              />
            </div>
          }
        />
      ) : null}
      {isDelete ? (
        <Modal
          open={deleteOpen}
          footer={[deleteModalFooter]}
          extraProps={{
            width: "40%",
            centered: true,
          }}
          handleClose={handleDeleteClose}
          content={<p>از حذف {instanceName} مورد نظر اطمینان دارید؟</p>}
        />
      ) : null}
    </div>
  );
};
