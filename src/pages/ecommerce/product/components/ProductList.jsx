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
import { MdOutlineEdit } from "react-icons/md";

import config from "../../../../config";
import axios from "axios";
import BasicTableEcommerce from "../../components/table-ecommerce/BasicTableEcommerce";

const ProductList = forwardRef((props, ref) => {
  const apiUrl = config.apiUrl + "/product";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Image',
        accessor: 'product_images[0].image_url',
        Cell: ({ row }) => <img src={row.original.product_images[0].image_url} alt="Product"  style={{ width: '120px', height: '120px' }} />,
      },
      {
        Header: 'Product Name',
        accessor: 'name'
      },   
      {
        Header: 'Description',
        accessor: 'description',
        width: '10px'
      }, 
      {
        Header: 'Category',
        accessor: 'category.name'
      },
      {
        Header: 'Stok',
        accessor: 'stock'
      },
      {
        Header: 'Price',
        accessor: 'price'
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
          <div className="icon-action">
             
              <div className="icon-action-edit" title="Edit">
                <MdOutlineEdit onClick={() => props.onEdit(row.values)} />
              </div>
            
            </div>
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
    <BasicTableEcommerce
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      totalPage={totalPage}
      totalData={totalData}
    />
  );
});

export default ProductList;

ProductList.defaultProps = {
  onDetail: (data) => {},
  onEdit: (data) => {},
  onDelete: (data) => {},
};
