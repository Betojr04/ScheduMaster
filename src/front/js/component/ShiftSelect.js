import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";


const ShiftSelect = ({ selectedShift, handleShiftChange, shifts }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`shift-label-${selectedShift}`}>Shift</InputLabel>
      <Select
        labelId={`shift-label-${selectedShift}`}
        value={selectedShift}
        onChange={handleShiftChange}
      >
        <MenuItem value="">
          <em>-- Please select a shift --</em>
        </MenuItem>
        {shifts.map((shift) => (
          <MenuItem key={shift.id} value={shift.id}>
            {shift.team} ({shift.startTime} - {shift.endTime}, Lead:{" "}
            {shift.lead}, Manager: {shift.manager}, Days Off:{" "}
            {shift.daysOff.join(", ")}, Day Off from Phone Time:{" "}
            {shift.dayOffPhone})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

ShiftSelect.propTypes = {
  selectedShift: PropTypes.number.isRequired,
  handleShiftChange: PropTypes.func.isRequired,
  shifts: PropTypes.array.isRequired,
};

export default ShiftSelect;
