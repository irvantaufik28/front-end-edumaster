import { useNavigate } from "react-router-dom";
import "./pagenotfound.css";
const PageNotFoud = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="body-error-page">
      <div className="container">
        <div className="info-label">
          <div className="error">
            <h2> 404 </h2>
            <div className="text">
              <b>Error</b>
            </div>
          </div>
        </div>
        <div className="info-text">
          <h1>Page not found</h1>
          <a href="#" onClick={handleBack}>
            {" "}
            Go back to the previous page{" "}
          </a>{" "}
        </div>
      </div>
    </div>
  );
};

export default PageNotFoud;
