import React, { useEffect } from 'react'
import { useLandingLayoutWizard } from '../../../core/contexts/LandingLayoutWizard/LandingLayoutWizard'

import LandingPage from './Landing'
import CategoryList from './CategoryList'
import Profile from '../Profile/Profile'
const LandingWraper = () => {
  const { currentStep, goNextPage } = useLandingLayoutWizard()
  useEffect(() => {
    const scrollToTop = () => {
      const element = document.querySelector('.App');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToTop();
  }, [currentStep]);
  return (
    <div>
         <LandingPage />
    </div>
  )
}

export default LandingWraper
