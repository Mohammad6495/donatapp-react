import React from "react";
import { useCakeOrderContext } from "../../../core/contexts/CakeOrderContext/CakeOrderContext";

///StepsComponents
import CakeOrderUpsert from "./CakeOrderUpsert";
import SelectFinalUpsertCake from "./SelectFinalUpsertCake";

const WraperCakeOrder = () => {
  const { currentStep } = useCakeOrderContext();
  return (
    <div className="d-flex flex-column w-100">
      <div className={currentStep == 0 ? "d-block" : "d-none"}>
        <CakeOrderUpsert />
      </div>
      <div className={currentStep == 1 ? "d-block" : "d-none"}>
        <SelectFinalUpsertCake />
      </div>
    </div>
  );
};

export default WraperCakeOrder;
