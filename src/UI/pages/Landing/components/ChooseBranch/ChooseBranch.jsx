import React from "react";
import { useBranchesContext } from "../../../../../core/contexts/BranchesContext/BranchesContext";
import LandingBranchMapItem from "../LandingBranchItem/LandingBranchItem";
import { useNavigate } from "react-router";
import "./ChooseBranch.scss";

const ChooseBranch = () => {
  const { branch, allBranches } = useBranchesContext();
  const navigate = useNavigate();

  // Handle Clicking on Branch
  const handleClickBranch = (branchId) => {
    if (!branchId) return;
    setBranch(branchId);
    http.setToken(http.branchKey, branchId);
    handleCloseDialog();

    setDrawerOpen(false);
  };

  // handle Calculate Price
  const handleRedirectToCalcPrice = () => {
    navigate("/calc-price");
  };

  return (
    <section className="m-0 p-0 d-flex flex-column justify-content-start align-items-center w-100">
      <div className="m-0 py-4 px-3 d-flex flex-column drawer-branch-items-holder h-100">
        
        <div className="drawer-branches-holder h-100">
          {/* Drawer active branche */}
          <div
            dir="rtl"
            className="d-flex flex-column justify-content-between align-items-stretch h-100 mt-4 m-0 p-0"
          >
            <div className="d-flex flex-column justify-content-center align-items-stretch w-100">
              {allBranches?.length !== 0 &&
                allBranches?.map((item) => (
                  <LandingBranchMapItem
                    key={item?.id}
                    branchId={item?.id}
                    branchName={item?.city}
                    centerPosition={[item?.lat, item?.lng]}
                    branchAddress={item?.address}
                    branchClickHandler={handleClickBranch}
                    isActive={item?.id == branch}
                  />
                ))}
            </div>
                
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseBranch;
