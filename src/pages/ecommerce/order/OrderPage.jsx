import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EcommerceLayout from "../../../components/layouts/EcommerceLayout";
import CustomTabPanel from "../../../components/tabs/CustomTabPanel";
import AllOrderTabs from "./components/all-order-tabs/AllOrderTabs";
import NotYetPaidTabs from "./components/not-yet-paid-tabs/NotYetPaidTabs";
import NeedProcessingTab from "./components/need-processing-tab/NeedProcessingTab";
import DoneTab from "./components/done-tab/DoneTab";
import CanceledTab from "./components/canceled-tab/CanceledTab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrderPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <EcommerceLayout>
     
          <div className="main-content">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Not Yet Paid" {...a11yProps(1)} />
                <Tab label="Needs processing" {...a11yProps(2)} />
                <Tab label="Finish" {...a11yProps(3)} />
                <Tab label="Cancellation" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
             <AllOrderTabs/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
             <NotYetPaidTabs/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <NeedProcessingTab/>
            </CustomTabPanel> 
            <CustomTabPanel value={value} index={3}>
              <DoneTab/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <CanceledTab/>
            </CustomTabPanel>
          </Box>
          </div>
      </EcommerceLayout>
    </>
  );
};

export default OrderPage;
