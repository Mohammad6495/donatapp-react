import React, {
    useState,
    useEffect,
    createContext,
    useContext,
} from "react";
import http from "../../services/http";
import { useLocation, useNavigate } from "react-router";
import { locationSearchStringToObject, objectToQueryString } from "../../utility/utils";

const LandingLayoutWizard = createContext();

const LandingLayoutWizardProvider = ({ children }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        let qs = location.search ?? "";
        let qo = locationSearchStringToObject(qs) ?? {};
        if(qo?.pageId != undefined) {
            setCurrentStep(Number(qo?.pageId))
        }
    }, [location.search])
    const goNextPage = (index) => {
        setCurrentStep(index)
        let qs = location.search ?? "";
        let qo = locationSearchStringToObject(qs) ?? {};
        qo.pageId = index;
        const newQs = objectToQueryString(qo);
        navigate(location.pathname + newQs);
    }

    const providerValue = {
        currentStep,
        setCurrentStep,
        goNextPage
    };

    return (
        <LandingLayoutWizard.Provider value={providerValue}>
            {children}
        </LandingLayoutWizard.Provider>
    );
};

export const useLandingLayoutWizard = () => useContext(LandingLayoutWizard);

export default LandingLayoutWizardProvider;
