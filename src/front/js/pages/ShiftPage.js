import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ShiftBidForm from "../component/ShiftBidForm";

export const ShiftPage = () => {
  const { store } = useContext(Context);
  const seniority = store.userData?.seniority;

  const handleSubmit = async (selectedShifts) => {
    // Ensure that actions and seniority are defined
    if (actions && seniority) {
      try {
        await actions.submitShiftBid(selectedShifts);
        // Handle success, e.g., show a message
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error submitting shift bids:", error);
      }
    }
  };

  return (
    <main>
      <h1>Shift Bidding</h1>
      <ShiftBidForm seniority={seniority} onSubmit={handleSubmit} />
    </main>
  );
};
