import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ShiftSelect from "./ShiftSelect";
import { generateShifts } from "./ShiftUtils";

const ShiftBidForm = ({ seniority, onSubmit }) => {
  const [selectedShifts, setSelectedShifts] = useState([]);

  // When the seniority prop updates, reset the selectedShifts state
  useEffect(() => {
    if (seniority > 0) {
      setSelectedShifts(Array(seniority).fill(""));
    }
  }, [seniority]);

  const handleShiftChange = (index) => (event) => {
    const newSelectedShifts = [...selectedShifts];
    newSelectedShifts[index] = event.target.value;
    setSelectedShifts(newSelectedShifts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedShifts);
  };

  // Handling the case where seniority is not yet defined or is zero
  if (!seniority || seniority <= 0) {
    return <div>No bidding options available.</div>;
  }

  const shifts = generateShifts(6, 25); // Adjust these parameters as needed

  return (
    <form onSubmit={handleSubmit}>
      {selectedShifts.map((_, index) => (
        <ShiftSelect
          key={index}
          selectedShift={selectedShifts[index]}
          handleShiftChange={handleShiftChange(index)}
          shifts={shifts}
        />
      ))}
      <button type="submit" className="submit-btn">
        Submit Bids
      </button>
    </form>
  );
};

ShiftBidForm.propTypes = {
  seniority: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ShiftBidForm;
