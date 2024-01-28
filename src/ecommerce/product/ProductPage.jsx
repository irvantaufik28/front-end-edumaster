import { RxReset } from "react-icons/rx";
import ButtonDanger from "../../components/ui/button/ButtonDanger";
import { FaSearch } from "react-icons/fa";
import ButtonSuccess from "../../components/ui/button/ButtonSuccess";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
import { CgImport } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import { SiAddthis } from "react-icons/si";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./components/ProductList";
import {
  categoryProductSelector,
  getAllCategory,
} from "../../features/ecommerce/categoryProduct";
import EcommerceLayout from "../../components/layouts/EcommerceLayout";

const ProductPage = () => {
  const categoryProductList = useSelector(categoryProductSelector.selectAll);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const tableRef = useRef(null);
  const handleAdd = () => {
    navigate("/ecommerce/add-product");
  };

  const handleEdit = async (data) => {
    const product_id = data._id;
    navigate(`/ecommerce/edit-product/${product_id}`);
  };

  const [search, setSearch] = useState({
    name: "",
    category: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    tableRef.current.doFilter({
      name: search.name,
      category: search.category,
    });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSearch({
      name: "",
      category: "",
    });
    tableRef.current.doFilter({
      name: "",
      category: "",
    });
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
  };
  return (
    <EcommerceLayout>
      <div className="main-content">
        <HeaderContentGlobal title={"Product"} page={"Product"} type={"List"} />
        <div className="main-content-alpha">
          <div className="global-head">
            <div className="row sub-header-content">
              <div className="col-md-6 add-student">
                <ButtonPrimary
                  title="add"
                  onClick={handleAdd}
                  icon={<SiAddthis />}
                />
              </div>
              <div className="col-md-6 right-button-student-list">
                <div>
                  <ButtonPrimary title="Import" icon={<CgImport />} />
                </div>
                <div>
                  <ButtonPrimary title="Export" icon={<BiExport />} />
                </div>
              </div>
            </div>
            <div className="search-box-global">
              <div className="row">
                <div className="col-md-4 mb-4">
                  <label htmlFor="nama-classroom" className="form-label">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nik"
                    onChange={(e) =>
                      setSearch({
                        ...search,
                        ...{ name: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="status" className="form-label">
                    Category
                  </label>
                  <div>
                    <select
                      className="form-control"
                      aria-label="Default select example"
                      id="status"
                      onChange={(e) =>
                        setSearch({
                          ...search,
                          ...{ category: e.target.value },
                        })
                      }
                      value={search.category}
                    >
                      <option value="">Select category</option>
                      {categoryProductList?.map((option) => (
                        <option key={option._id} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="col-md-6 button-search-student">
                    <ButtonSuccess
                      title="search"
                      icon={<FaSearch />}
                      onClick={handleSearch}
                    />
                    <ButtonDanger
                      title="reset"
                      icon={<RxReset />}
                      onClick={handleReset}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductList ref={tableRef} onEdit={(data) => handleEdit(data)} />
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default ProductPage;
