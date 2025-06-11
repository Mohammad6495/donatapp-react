import React from "react";

// Context Providers
import LoadingProvider from "./core/contexts/LoadingContext/LoadingContext";
import AuthContextProvider from "./core/contexts/AuthContext/AuthContext";
import ProfileContextProvider from "./core/contexts/UserProfileContext/UserProfileContext";
import BranchesContextProvider from "./core/contexts/BranchesContext/BranchesContext";
import CreamyCookiesContextProvider from "./core/contexts/CreamyCookiesContext/CreamyCookiesContext";
import CookiesContextProvider from "./core/contexts/CookiesContext/CookiesContext";
import RefrigeratorCakeContextProvider from "./core/contexts/RefrigeratorCakeContext/RefrigeratorCakeContext";
import ShopBasketContextProvider from "./core/contexts/ShopBasket/shopBasket.ctx";
import CakeOrderContextProvider from "./core/contexts/CakeOrderContext/CakeOrderContext";
// MaterialTheme Context Provider
import MaterialTheme from "./core/contexts/MaterialThemeContext/MaterialThemeContext";
// Toastify
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
// RouteConfig
import RouterConfig from "./core/routing/routerConfig";
// Utilities

// Css
import "react-toastify/dist/ReactToastify.css";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./UI/components/errorBoundry.component";
import DessertAndBakeryContextProvider from "./core/contexts/DessertAndBakery/dessertAndBakery";
import ShowBranchModalContextProvider from "./core/contexts/ShowBranchModalContext/ShowBranchModalContext";
import MapContextProvider from "./core/contexts/mapProvider";
import useDetectIp from "./core/custom-hooks/useDetectIp";
import LandingLayoutWizardProvider from "./core/contexts/LandingLayoutWizard/LandingLayoutWizard";
import FavoriteContextProvider from "./core/contexts/FavoriteContext/FavoriteContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TipsContextProvider from "./core/contexts/TipsContext/TipsContext";

function App() {
  const { isOnline } = useDetectIp();
  const queryClient = new QueryClient();

  return (
    <div className="App d-flex justify-content-center align-items-center">
      {isOnline()}
      <ToastContainer
        rtl={true}
        style={{
          zIndex: "1000000000",
          width: "100%",
          maxWidth: "576px",
          margin: "0 auto",
          fontFamily: "iransans",
          top: "env(safe-area-inset-top)",
        }}
        className="font-iransans text-nowrap"
        theme="colored"
        position="top-center"
        transition={(props) => <Slide {...props} />}
      />
      <QueryClientProvider client={queryClient}>
        <ShowBranchModalContextProvider>
          <MaterialTheme>
            <LoadingProvider>
              <AuthContextProvider>
                <BranchesContextProvider>
                  <ProfileContextProvider>
                    <TipsContextProvider>
                      <FavoriteContextProvider>
                        <MapContextProvider>
                          <RefrigeratorCakeContextProvider>
                            <CreamyCookiesContextProvider>
                              <CookiesContextProvider>
                                <DessertAndBakeryContextProvider>
                                  <ShopBasketContextProvider>
                                    <CakeOrderContextProvider>
                                      <LandingLayoutWizardProvider>
                                        <ErrorBoundary
                                          fallbackRender={(props) => (
                                            <ErrorFallback {...props} />
                                          )}
                                        >
                                          <RouterConfig />
                                        </ErrorBoundary>
                                      </LandingLayoutWizardProvider>
                                    </CakeOrderContextProvider>
                                  </ShopBasketContextProvider>
                                </DessertAndBakeryContextProvider>
                              </CookiesContextProvider>
                            </CreamyCookiesContextProvider>
                          </RefrigeratorCakeContextProvider>
                        </MapContextProvider>
                      </FavoriteContextProvider>
                    </TipsContextProvider>
                  </ProfileContextProvider>
                </BranchesContextProvider>
              </AuthContextProvider>
            </LoadingProvider>
          </MaterialTheme>
        </ShowBranchModalContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
