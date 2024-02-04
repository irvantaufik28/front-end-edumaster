import ShopLayout from "../../../../components/layouts/ShopLayout";
// import StudentLayout from "../../../../components/layouts/StudentLayout";
// import CardProducts from "./components/CardProducts";
import ProductList from "./components/product/ProductList";

const ShopProduct = () => {
  return (
    <ShopLayout>
      <div className="main-content">
        <ProductList />
      </div>
    </ShopLayout>
  );
};

export default ShopProduct;
