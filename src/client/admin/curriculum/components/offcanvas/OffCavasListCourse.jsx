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
import { setDataCourseCheckBox } from "../../../../../features/courseSlice";

const OffCanvasListCourse = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const { id: structureCurriculumId } = useParams();
  const dispatch = useDispatch();
  const apiUrl = config.apiUrl + "/course";

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const handleCheckBox = (row) => {
    setSelectedData((prevSelectedData) => {
      const existingIndex = prevSelectedData.findIndex((item) => item.course_id === row.id);

      if (existingIndex !== -1) {
        return [
          ...prevSelectedData.slice(0, existingIndex),
          ...prevSelectedData.slice(existingIndex + 1),
        ];
      } else {
        return [
          ...prevSelectedData,
          {
            course_id: row.id,
            meet_per_week: 1,
            structure_curriculum_id: parseInt(structureCurriculumId),
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
          course_id: item.id,
          meet_per_week: 1,
          structure_curriculum_id: parseInt(structureCurriculumId),
        }))
      );
    }
  };

  useEffect(() => {
    dispatch(setDataCourseCheckBox(selectedData));
  }, [dispatch, selectedData]);

  const handleQtyChange = (rowId, value) => {
    setSelectedData((prevSelectedData) => {
      const updatedData = prevSelectedData.map((item) =>
        item.course_id === rowId ? { ...item, meet_per_week: parseInt(value, 10) || 1 } : item
      );

      return updatedData;
    });
  };

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
            checked={selectedData.some((item) => item.course_id === row.original.id)}
            id={`checkbox-${row.original.id}`}
          />
        ),
      },
      {
        id: "meet_per_week",
        Header: "Meet Per week",
        Cell: ({ row }) => (
          <Form.Control
            type="number"
            placeholder="1"
            value={
              selectedData.find((item) => item.course_id === row.original.id)?.meet_per_week || 1
            }
            onChange={(e) => handleQtyChange(row.original.id, e.target.value)}
          />
        ),
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Course Name",
        accessor: "name",
      },
      {
        Header: "Grade",
        accessor: "level",
      },
      {
        Header: "Semester",
        accessor: "semester",
      },
      {
        Header: "Type",
        accessor: "type",
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

        params.not_in_curriculum = structureCurriculumId

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

export default OffCanvasListCourse;
