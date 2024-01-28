/* eslint-disable no-unused-vars */
import { useState } from "react";
import { DateRangePicker } from "rsuite";
import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";

const FormCalendar = (props) => {
  const [dateRange, setDateRange] = useState([]);

  const handleDateChange = (value) => {
    console.log(value)
    setDateRange(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateRange) {
      props.onSubmit([]);
    } else {
      props.onSubmit(dateRange);
    }
  };

  return (
    <>
      <Stack spacing={10} direction="column" alignItems="flex-start">
        <DateRangePicker
          format="MM/dd/yyyy"
          character=" – "
          value={dateRange}
          onChange={handleDateChange}
        />
      </Stack>
    </>
  );
};

FormCalendar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormCalendar;
