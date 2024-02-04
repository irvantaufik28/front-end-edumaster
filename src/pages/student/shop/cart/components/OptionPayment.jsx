
const OptionPayment = () => {
  return (
    <div className="card mb-4 mb-lg-0">
    <div className="card-body">
      <p>
        <strong>We accept</strong>
      </p>
      <img
        className="me-2"
        width="45px"
        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
        alt="Visa"
      />
      <img
        className="me-2"
        width="45px"
        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
        alt="American Express"
      />
      <img
        className="me-2"
        width="45px"
        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
        alt="Mastercard"
      />
    </div>
  </div>
  )
}

export default OptionPayment