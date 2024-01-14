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
import config from "../../../../config";
import { Button } from "react-bootstrap";
import { BiSolidDetail } from "react-icons/bi";
import { MdDelete, MdModeEdit } from "react-icons/md";
import axios from "axios";
import BasicTable from "../../../../components/table/BasicTable";
import { useParams } from "react-router-dom";

const ListTeacherSchedule = forwardRef((props, ref) => {
  const { id } = useParams();
  const apiUrl = config.apiUrl + "/teacher-schedule/";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Day",
        accessor: "day_name",
      },
      {
        Header: "Course",
        accessor: "",
        Cell: ({ row }) => (
          <div>
            <div>
              {`${row.original.teacher_course.courses.name} Kelas ${row.original.teacher_course.courses.level}` ||
                "-"}
            </div>
          </div>
        ),
      },
     
      {
        Header: "Classroom",
        accessor: "",
        Cell: ({ row }) => (
          <div>
            <div>
              {`${row.original.classroom.classMajor.name} Kelas ${row.original.classroom.level} ${row.original.classroom.code} ${row.original.classroom.year_group}` ||
                "-"}
            </div>
          </div>
        ),
      },
      {
        Header: "Start Time",
        accessor: "start_time",
      },
      {
        Header: "End Time",
        accessor: "end_time",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <Button
              variant="danger"
              size="sm"
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

        const response = await axios.get(apiUrl + id, {
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

export default ListTeacherSchedule;

ListTeacherSchedule.defaultProps = {
  onManage: (data) => {},
  onEdit: (data) => {},
  onDelete: (data) => {},
};
