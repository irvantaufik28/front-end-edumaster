/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import BasicTable from "../../../../../components/table/BasicTable";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import config from "../../../../../config";
import { setDataRolePermissionCheckBox } from "../../../../../features/roleSlice";

const OffCanvasListPermission = forwardRef((props, ref) => {
  
  const [loading, setLoading] = useState(false);
  const { id: role_id } = useParams();
  const dispatch = useDispatch();
  const apiUrl = config.apiUrl + "/permission";

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const handleCheckBox = (row) => {
    setSelectedData((prevSelectedData) => {
      const existingIndex = prevSelectedData.findIndex(
        (item) => item.permission_id === row.id
      );
  
      if (existingIndex !== -1) {
        return [
          ...prevSelectedData.slice(0, existingIndex),
          ...prevSelectedData.slice(existingIndex + 1),
        ];
      } else {
        return [
          ...prevSelectedData,
          {
            permission_id: row.id,
            role_id: parseInt(role_id),
          },
        ];
      }
    });
  };

  const handleMasterCheckBoxChange = () => {
    const allChecked = data.length === selectedData.length;
    if (allChecked) {
      setSelectedData([]);
    } else {
      setSelectedData(
        data.map((item) => ({
          permission_id: item.id,
          role_id: parseInt(role_id),
        }))
      );
    }
  };

  useEffect(() => {
    dispatch(setDataRolePermissionCheckBox(selectedData));
  }, [dispatch, selectedData]);

  const columns = useMemo(
    () => [
      {
        id: "masterCheckbox",
        Header: (
          <Form.Check
            type="checkbox"
            checked={data.length > 0 && data.length === selectedData.length}
            onChange={handleMasterCheckBoxChange}
          />
        ),
        Cell: ({ row }) => (
          <Form.Check
            onChange={() => handleCheckBox(row.original)}
            type="checkbox"
            checked={selectedData.some(
              (item) => item.permission_id === row.original.id
            )}
            id={`checkbox-${row.original.id}`}
          />
        ),
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Permission",
        accessor: "name",
      },
       {
        Header: "Description",
        accessor: "descripton",
      },
    ],
    [props, selectedData]
  );
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const filters = useRef({});
  const currentPageIndex = useRef({});
  const currentpage = useRef(11);
  const currentSortBy = useRef({});

  useImperativeHandle(ref, () => ({
    refreshData() {
      const defaultValues = {
        pageSize: currentpage.current,
        pageIndex: 0,
        sortBy: [],
      };

      fetchData({ ...defaultValues });
    },

    reloadData() {
      const values = {
        pageIndex: currentPageIndex.current,
        pageSize: currentpage.current,
        sortBy: currentSortBy.current,
      };
      fetchData({ ...values });
    },

    doFilter(data) {
      filters.current = data;
      this.refreshData();
    },
  }));

  const fetchData = useCallback(
    async ({ pageSize, pageIndex, sortBy }) => {
      setLoading(false);
      try {
        const params = {
          page: pageIndex + 1,

          ...filters.current,
        };

        if (sortBy && sortBy.length) {
          params.orderBy = sortBy[0].id;
          params.sortBy = sortBy[0].desc ? "desc" : "asc";
        }

        if (pageSize) params.size = pageSize;

        params.not_in_role = role_id;
    

        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const response = await axios.get(apiUrl, {
          params,
          headers: {
            authorization: token,
          },
        });

        const { data } = response;
        const list = data?.data;

        setData(list);
        setTotalPage(data?.paging?.total_page);
        setTotalData(data?.paging?.total_item);

        currentPageIndex.current = pageIndex;
        currentPageIndex.current = pageSize;
        currentPageIndex.sortBy = sortBy;

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [apiUrl]
  );
  return (
    <BasicTable
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      totalPage={totalPage}
      totalData={totalData}
    />
  );
});

export default OffCanvasListPermission;
