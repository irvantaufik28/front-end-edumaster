/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "react-bootstrap";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import config from "../../../../config";
import BasicTable from "../../../../components/table/BasicTable";

const ListRole = forwardRef((props, ref) => {
  const apiUrl = config.apiUrl + "/role";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "no",
        Cell: (cellProps) => cellProps.row.index + 1,
      },
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      }, {
        Header: "Display Name",
        accessor: "display_name",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <Button
              variant="secondary"
              size="sm"
              hidden = {row.original.name === "administrator" || row.original.name === "teacher" || row.original.name === "student"}
              className="me-2"
              onClick={() => props.onManage(row.values)}
            >
              <BiSolidDetail /> Manage
            </Button>
            <Button
              variant="info"
              size="sm"
              hidden = {row.original.name === "administrator" || row.original.name === "teacher" || row.original.name === "student"}
              className="me-2"
              onClick={() => props.onEdit(row.values)}
            >
              <MdModeEdit /> Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              hidden = {row.original.name === "administrator" || row.original.name === "teacher" || row.original.name === "student"}
              onClick={() => props.onDelete(row.values)}
            >
              <MdDelete /> Delete
            </Button>
          </>
        ),
      },
    ],
    [props]
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

        // if (page) params.page = page;
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const response = await axios.get(apiUrl, {
          params,
          headers: {
            Authorization: token,
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

export default ListRole;

ListRole.defaultProps = {
  onManage: (data) => {},
  onEdit: (data) => {},
  onDelete: (data) => {},
};
