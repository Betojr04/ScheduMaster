import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShiftSelect from './ShiftSelect';
import { generateShifts } from './ShiftUtils';


const shifts = generateShifts(6, 25);

const ShiftBidForm = ({ seniority, onSubmit }) => {
    const [selectedShifts, setSelectedShifts] = useState(Array(seniority).fill(''));

    const handleShiftChange = (index) => (event) => {
        const newSelectedShifts = [...selectedShifts];
        newSelectedShifts[index] = event.target.value;
        setSelectedShifts(newSelectedShifts);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(selectedShifts);
    };

    return (
        <form onSubmit={handleSubmit}>
            {Array.from({ length: seniority }, (_, index) => (
                <ShiftSelect
                    key={index}
                    selectedShift={selectedShifts[index]}
                    handleShiftChange={handleShiftChange(index)}
                    shifts={shifts}
                />
            ))}
            <button type="submit" className="submit-btn">Submit Bids</button>
        </form>
    );
};

ShiftBidForm.propTypes = {
    seniority: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ShiftBidForm;
