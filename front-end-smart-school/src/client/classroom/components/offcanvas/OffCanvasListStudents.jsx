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
import config from "../../../../config";
import BasicTable from "../../../../components/table/BasicTable";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setDataCheckBox } from "../../../../features/classroomSlice";
import { useParams } from "react-router-dom";

const OffCanvasListStudent = forwardRef((props, ref) => {
  const { id } = useParams();
  const dispacth = useDispatch();
  const apiUrl = config.apiUrl + "/student";
  const [ids, setIds] = useState([]);
  const handleCheckBox = (row) => {
    setIds((prevIds) => {
      const existingIndex = prevIds.findIndex((item) => item.id === row.id);

      if (existingIndex !== -1) {
        return [
          ...prevIds.slice(0, existingIndex),
          ...prevIds.slice(existingIndex + 1),
        ];
      } else {
        return [...prevIds, { id: row.id }];
      }
    });
  };

  const handleMasterCheckBoxChange = () => {
    const allChecked = data.length === ids.length;
    if (allChecked) {
      setIds([]);
    } else {
      setIds(data.map((item) => ({ id: item.id })));
    }
  };

  useEffect(() => {
    dispacth(setDataCheckBox(ids));
  }, [dispacth, ids]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        id: "masterCheckbox",
        Header: (
          <Form.Check
            type="checkbox"
            checked={data.length > 0 && data.length === ids.length}
            onChange={handleMasterCheckBoxChange}
          />
        ),
        Cell: ({ row }) => (
          <Form.Check
            onChange={() => handleCheckBox(row.original)}
            type="checkbox"
            checked={ids.some((item) => item.id === row.original.id)}
            id={`checkbox-${row.original.id}`}
          />
        ),
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "NIS",
        accessor: "nis",
      },
      {
        Header: "Foto",
        accessor: "foto_url",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Middle Name",
        accessor: "middle_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Birth Date",
        accessor: "birth_date",
      },

      {
        Header: "Register",
        accessor: "register_year",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    [props, ids]
  );
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const filters = useRef({});
  console.log(filters);
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
       
          params.not_in_classroom_id = parseInt(id);
       
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

export default OffCanvasListStudent;
