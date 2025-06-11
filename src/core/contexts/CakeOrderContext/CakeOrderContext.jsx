import { useState, createContext, useContext } from 'react'

const Context = createContext({});
const CakeOrderContextProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [cakeOrderData, setCakeOrderData] = useState()

    const handleGoNext = () => {
        setCurrentStep(currentStep + 1)
    }

    const handleGoPrev = () => {
        setCurrentStep(currentStep - 1)
    }

    const contextValues = {
        currentStep,
        setCurrentStep,
        handleGoNext,
        handleGoPrev,
        setCakeOrderData,
        cakeOrderData
    }
  return (
    <Context.Provider value={contextValues}>
     {children}
    </Context.Provider>
  )
}

export const useCakeOrderContext = () => useContext(Context)

export default CakeOrderContextProvider