import { useSelector } from "react-redux";
import { productSelector } from "../../../../../../features/ecommerce/productSlice";

const ProductImages = () => {
  const product = useSelector(productSelector.selectAll);

  return (
    <>
      <aside className="col-lg-6">
        <div className="border rounded-4 mb-3 d-flex justify-content-center">
          <a
            data-fslightbox="mygalley"
            className="rounded-4"
            target="_blank"
            data-type="image"
            rel="noreferrer"
          >
            <img
              style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }}
              className="rounded-4 fit"
              src={product?.data?.product_images[0]?.image_url ?? ""}
            />
          </a>
        </div>
        <div className="d-flex justify-content-center mb-3">
          {product?.data?.product_images?.map((item, index) => (
            <a
              data-fslightbox="mygalley"
              className="border mx-1 rounded-2"
              target="_blank"
              data-type="image"
              href={item?.image_url}
              rel="noreferrer"
              key={index}
            >
              <img
                width={60}
                height={60}
                className="rounded-2"
                src={item?.image_url}
              />
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default ProductImages;
