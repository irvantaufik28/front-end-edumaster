/* eslint-disable react/prop-types */
import "../../styles/layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="layout-content">{children}</div>
    </div>
  );
};
