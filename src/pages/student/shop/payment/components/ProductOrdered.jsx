import { useSelector } from "react-redux";
import { orderSelector } from "@features/ecommerce/orderSlice";

const ProductOrdered = () => {
  const orderData = useSelector(orderSelector.selectAll);
  const formatterCurrencyIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="table-responsive">
                  <table
                    className="react-basic-table"
                    style={{ marginBottom: "100px" }}
                  >
                    <thead>
                      <tr>
                        <td style={{ border: "0" }}></td>
                        <td style={{ border: "0" }}></td>
                        <td className="text-center" style={{ border: "0" }}>
                          <strong>Unit Price</strong>
                        </td>
                        <td className="text-center" style={{ border: "0" }}>
                          <strong>Amount</strong>
                        </td>
                        <td className="text-right" style={{ border: "0" }}>
                          <strong>Item Subtotal</strong>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {/* foreach ($order->lineItems as $line) or some such thing here */}
                      {orderData?.order_products?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={item?.product_images[0]?.image_url}
                              style={{ width: "30px" }}
                            />
                          </td>
                          <td>{item?.name}</td>
                          <td className="text-center">
                            {formatterCurrencyIDR.format(item?.price)}
                          </td>
                          <td className="text-center">{item?.qty}</td>
                          <td className="text-right">
                            {formatterCurrencyIDR.format(item?.total_price)}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="thick-line" />
                        <td className="thick-line" />
                        <td className="thick-line" />
                        <td className="thick-line text-center">
                          <strong>Subtotal</strong>
                        </td>
                        <td className="thick-line text-right">
                          {formatterCurrencyIDR.format(
                            orderData?.grand_total_price
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line text-center">
                          <strong>Shipping</strong>
                        </td>
                        <td className="no-line text-right">0</td>
                      </tr>
                      <tr>
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line" />
                        <td className="no-line text-center">
                          <strong>Total</strong>
                        </td>
                        <td className="no-line text-right">
                          {formatterCurrencyIDR.format(
                            orderData?.grand_total_price
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOrdered;
