import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ShiftBidForm from "../component/ShiftBidForm";

export const ShiftPage = () => {
  const { store, actions } = useContext(Context);
  const seniority = store.userData?.seniority;

  useEffect(() => {
    if (!store.userData) {
    }
  }, [store.userData]);

  const handleSubmit = async (selectedShifts) => {
    try {
      await actions.submitShiftBid(selectedShifts);
    } catch (error) {
      console.error("Error submitting shift bids:", error);
    }
  };

  if (typeof seniority === "undefined") {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Shift Bidding</h1>
      <ShiftBidForm seniority={seniority} onSubmit={handleSubmit} />
    </main>
  );
};
