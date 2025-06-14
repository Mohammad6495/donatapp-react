import React, { lazy, Suspense, useEffect, CSSProperties } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import SpinnerLoading from "../../UI/components/spinnerLoading.component";
import { useAuthContext } from "../contexts/AuthContext/AuthContext";

const AuthLayout = lazy(() => import("../../UI/layouts/AuthLayout/AuthLayout"));
const BaseLayout = lazy(() => import("../../UI/layouts/BaseLayout/BaseLayout"));
const LandingLayout = lazy(() =>
  import("../../UI/layouts/LandingLayout/LandingLayout")
);

const LandingPage = lazy(() => import("../../UI/pages/Landing/LandingWraper"));

// Login
const Login = lazy(() => import("../../UI/pages/Login/Login"));
const VerifyLogin = lazy(() =>
  import("../../UI/pages/Login/components/VerifyLogin")
);
// Register
const Register = lazy(() => import("../../UI/pages/Register/Register"));
const VerifyRegister = lazy(() =>
  import("../../UI/pages/Register/components/VerifyRegister")
);

const Profile = lazy(() => import("../../UI/pages/Profile/Profile"));
const EditProfile = lazy(() =>
  import("../../UI/pages/EditProfile/EditProfile")
);
const CalculatePrice = lazy(() =>
  import("../../UI/pages/CalculateSendingPrice/CalculateSendingPrice")
);

const AddingAddress = lazy(() =>
  import("../../UI/pages/AddingAddress/AddingAddress")
);

const CheckoutCart = lazy(() =>
  import("../../UI/pages/CheckoutCart/CheckoutCart")
);

const ImageEditorPage = lazy(() =>
  import("../../UI/pages/ImageEditor/ImageEditor")
);
// GeneralOrderTracking
const GeneralOrderTracking = lazy(() =>
  import("../../UI/pages/GeneralOrderTracking/OrdersList.page")
);
const GeneralCakeOrderTracking = lazy(() =>
  import("../../UI/pages/GeneralCakeOrderTracking/OrdersList.page")
);

const GeneralOrderDetails = lazy(() =>
  import("../../UI/pages/GeneralOrderTracking/OrderDetails.page")
);
const GeneralCakeOrderDetails = lazy(() =>
  import("../../UI/pages/GeneralCakeOrderTracking/OrderDetails.page")
);

const OrderDetailsCheckVerifyNumber = lazy(() =>
  import(
    "../../UI/pages/GeneralOrderTracking/component/OrderDetailsCheckVerifyNumber"
  )
);

const CakeOrderListPage = lazy(() =>
  import("../../UI/pages/OrderCakeList/OrderCakeList")
);

const RegisteredOrders = lazy(() =>
  import("../../UI/pages/RegisteredOrders/RegisteredOrders")
);

const TomorrowCakeOrdersPage = lazy(() =>
  import("../../UI/pages/OrderTracking/tomorrowCakeOrders.page")
);
const TomorrowCakeOrderDetails = lazy(() =>
  import("../../UI/pages/OrderTracking/tomorrowCakeOrderDetails.page")
);

const FavoritePage = lazy(() =>
  import("../../UI/pages/FavoritePage/FavoritePage")
);
const FavoritItemDetailPage = lazy(() =>
  import("../../UI/pages/FavoritePage/FavoritItemDetail/FavoritItemDetail")
);

// Refrigerator Cake
const RefrigeratorCake = lazy(() =>
  import("../../UI/pages/RefrigeratorCake/RefrigeratorCake")
);
const CompareRefrigeratorCakes = lazy(() =>
  import("../../UI/pages/RefrigeratorCake/CompareRefrigeratorCakes")
);
const RefrigeratorCakeDetails = lazy(() =>
  import("../../UI/pages/RefrigeratorCakeDetails/RefrigeratorCakeDetails")
);
const RefrigeratorCakeDetailsCarousel = lazy(() =>
  import(
    "../../UI/pages/refrigeratorCakeDetailsCarousel/refrigeratorCakeDetailsCarousel"
  )
);

const RefrigeratorCakeOrderSubmit = lazy(() =>
  import("../../UI/pages/RefrigeratorCakeOrder/RefrigeratorCakeOrder")
);
// Creamy Cookie
const CreamyCookie = lazy(() =>
  import("../../UI/pages/CreamyCookie/CreamyCookie")
);
const CreamyCookieDetails = lazy(() =>
  import("../../UI/pages/CreamyCookie/components/CreamyCookieDetails")
);
// Cookies
const Cookies = lazy(() => import("../../UI/pages/Cookie/Cookie"));
const CookiesDetails = lazy(() =>
  import("../../UI/pages/Cookie/components/CookieDetails")
);

// Bakery
const Bakery = lazy(() => import("../../UI/pages/Bakery/Bakery.page"));
//
const SelectedBakeryItems = lazy(() =>
  import("../../UI/pages/Bakery/SelectedBakeryItems.page")
);
// Dessert
const Dessert = lazy(() => import("../../UI/pages/Dessert/Dessert.page"));
//
const SelectedDessertItems = lazy(() =>
  import("../../UI/pages/Dessert/SelectedDesserts.page")
);
// Norouzi
const Norouzi = lazy(() => import("../../UI/pages/Norouzi/Norouzi.page"));
const NorouziCart = lazy(() =>
  import("../../UI/pages/Norouzi/NorouziCheckoutCart")
);
//
const SelectedNorouziItems = lazy(() =>
  import("../../UI/pages/Norouzi/SelectedNorouzi.page")
);
//
const SuccessfullPaymentPage = lazy(() =>
  import("../../UI/pages/payment-result/successPayment.page")
);
//
const FailedPaymentPage = lazy(() =>
  import("../../UI/pages/payment-result/failedPayment.page")
);
// Choosing Box
const ChoosingBox = lazy(() =>
  import("../../UI/pages/ChoosingBox/ChoosingBox")
);
// Support
// CreateTicket
const CreateTicket = lazy(() =>
  import("../../UI/pages/CreateTicket/CreateTicket")
);
// TicketDetail
const TicketDetail = lazy(() =>
  import("../../UI/pages/Support/components/TicketDetail")
);
// FAQ
const FAQ = lazy(() => import("../../UI/pages/FAQ/FAQ"));
// Rules
// 404
const NotFound = lazy(() => import("../../UI/pages/404"));
// SpecialOffer
const SpecialOffer = lazy(() =>
  import("../../UI/pages/SpecialOffer/SpecialOffer")
);
///ExtraProductPage
const ExtraProductPage = lazy(() =>
  import("../../UI/pages/extraProducts/ExtraProduct.page")
);
//SaribaKeryPrice
const SaribaKeryPrice = lazy(() =>
  import("../../UI/pages/SaribaKeryPriceSlider/SaribaKeryPrice")
);
//DateOfBirthOfUsers
const DateOfBirthOfUsers = lazy(() =>
  import("../../UI/pages/DateOfBirthOfUsers/DateOfBirthOfUsers")
);
// AboutUs
const AboutUs = lazy(() => import("../../UI/pages/AboutUs/AboutUs"));
// CakeOrder
const WraperCakeOrder = lazy(() =>
  import("../../UI/pages/CakeOrderUpsert/WraperCakeOrder")
);
// ImageEditLogin
const ImageEditLogin = lazy(() =>
  import("../../UI/pages/ImageEditor/ImageEditLogin")
);
//ValidInPage
const ValidInPage = lazy(() =>
  import("../../UI/pages/ValidInPage/ValidInPage")
);
//SelectFinalUpsertCake

// const SelectFinalUpsertCake = lazy(() => import('../../UI/pages/CakeOrderUpsert/SelectFinalUpsertCake'))

///RedirectRefrigeratorCake
const RedirectRefrigeratorCake = lazy(() =>
  import("../../UI/pages/RedirectRefrigeratorCake/RedirectRefrigeratorCake")
);

///CategoryList
const CategoryList = lazy(() => import("../../UI/pages/Landing/CategoryList"));

const NavigateRouteToOrder = lazy(() =>
  import("../../UI/pages/NavigateRouteOrder/NavigateRouteOrder")
);

///RegisterComment
const RegisterCommentPage = lazy(() =>
  import("../../UI/pages/RegisterComment/RegisterComment.page")
);

///MessageFinalComment
const MessageFinalCommentPage = lazy(() =>
  import("../../UI/pages/RegisterComment/MessageFinalComment")
);

///MoreAddressPage
const MoreAddressPage = lazy(() =>
  import("../../UI/pages/Profile/MoreAddress.page")
);


const RedirectToGateWay = lazy(() =>
  import("../../UI/pages/RedirectToGateway/redirectToGateWay.page")
);

function RouterConfig() {
  const location = useLocation();
  ////////////////////////////////
  useEffect(() => {
    /////
    setTimeout(() => {
      /////
      window.scrollTo(0, 0); /////
    }, 0); /////
  }, [location.pathname]); /////
  ////////////////////////////////

  return (
    <Suspense fallback={<SpinnerLoading />}>
      <Routes>
        <Route path="/error-instagram-valid" element={<ValidInPage />} />
        <Route path="/:id" element={<NavigateRouteToOrder />} />
        <Route path="/" element={<WithLandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
        </Route>
        <Route element={<PrivateOutlet />}>
          <Route path="/r-c/:orderId" element={<RegisterCommentPage />} />
          <Route path="/message" element={<MessageFinalCommentPage />} />
        </Route>
        <Route
          path="/gateway-redirect"
          element={<RedirectToGateWay />}
        />

        <Route
          path="/redirect-cake-detail/:id"
          element={<RedirectRefrigeratorCake />}
        />

        <Route element={<WithBaseLayout />}>
          <Route path="/checkout-cart" element={<CheckoutCart />} />
        </Route>

        <Route
          path="/refrigerator-cake-order-submit"
          element={<RefrigeratorCakeOrderSubmit />}
        />

        {/* Private Branch Routes */}
        <Route element={<PrivateBranchOutlet />}>
          <Route path="/image-editor-code" element={<ImageEditorPage />} />
        </Route>
        {/* Private Routes */}
        <Route path="/" element={<PrivateOutlet />}>
          <Route
            path="/favorite-tomarrow/:id/:type"
            element={<FavoritItemDetailPage />}
          />
          <Route
            path="/favorite-refrigerator/:id/:type"
            element={<FavoritItemDetailPage />}
          />

          <Route path="/registered-order" element={<RegisteredOrders />} />
          <Route path="/add-address" element={<AddingAddress />} />
          <Route path="/edit-address/:id" element={<AddingAddress />} />

          <Route path="/cake-order" element={<WraperCakeOrder />} />
          <Route path="/cake-order-list" element={<CakeOrderListPage />} />
          <Route
            path="/general-order-tracking"
            element={<GeneralOrderTracking />}
          />
          <Route path="/more-address" element={<MoreAddressPage />} />
          <Route
            path="/general-cake-order-tracking"
            element={<GeneralCakeOrderTracking />}
          />
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/general-order-details/:id"
            element={<GeneralOrderDetails />}
          />
          <Route
            path="/general-cake-order-details/:id"
            element={<GeneralCakeOrderDetails />}
          />

          <Route
            path="/track-tomorrow-cake-order"
            element={<TomorrowCakeOrderDetails />}
          />
          <Route
            path="/success-payment/:paymentId/:requestId/:type/:payPrice/:trackingNumber"
            element={<SuccessfullPaymentPage />}
          />
          <Route
            path="/faild-payment/:paymentId/:requestId/:type/:payPrice/:trackingNumber"
            element={<FailedPaymentPage />}
          />

          <Route
            path="/selected-dessert-items"
            element={<SelectedDessertItems />}
          />
          <Route path="/extra-products" element={<ExtraProductPage />} />
          <Route
            path="/selected-norouzi-items"
            element={<SelectedNorouziItems />}
          />
          <Route
            path="/selected-bakery-items"
            element={<SelectedBakeryItems />}
          />
          <Route path="/calc-price" element={<CalculatePrice />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
          {/* GeneralOrderTracking */}

          {/* Creamy Cake */}
          <Route path="/creamy-cookie" element={<CreamyCookie />} />
          <Route
            path="/creamy-cookie-detail"
            element={<CreamyCookieDetails />}
          />
          {/* Cookies Routes */}
          <Route path="/cookie" element={<Cookies />} />
          <Route path="/cookie-detail" element={<CookiesDetails />} />

          {/* Refrigerator Cake Routes */}
          <Route
            path="/refrigerator-cake-details-carousel"
            element={<RefrigeratorCakeDetailsCarousel />}
          />
          <Route path="/refrigerator-cake" element={<RefrigeratorCake />} />
          <Route
            path="/compare-refrigerator-cakes"
            element={<CompareRefrigeratorCakes />}
          />
          <Route
            path="/refrigerator-cake-details/:id"
            element={<RefrigeratorCakeDetails />}
          />

          {/* Bakery Routes */}
          <Route path="/bakery" element={<Bakery />} />

          {/* Dessert Routes */}
          <Route path="/dessert" element={<Dessert />} />
          <Route path="/norouzi" element={<Norouzi />} />
          <Route path="/norouzi-cart" element={<NorouziCart />} />

          {/* Norouzi
SelectedNorouziItems */}
          {/* Choosing Box Route */}
          <Route path="/choosing-box/:id" element={<ChoosingBox />} />
          {/* FAQ */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/aboutus" element={<AboutUs />} />
          {/* Rules */}
          {/* Support */}
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/ticket-detail/:id" element={<TicketDetail />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* Payment Result */}
        </Route>
        {/* <Route path="/" element={<PublicOutlet />}> */}
        <Route element={<WithAuthLayoutBranch />}>
          <Route path="/branch-login" element={<ImageEditLogin />} />
        </Route>
        <Route path="/" element={<WithAuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route
            path="/verify-register/:phoneNumber"
            element={<VerifyRegister />}
          />
        </Route>
        <Route path="/saribakeryprice" element={<SaribaKeryPrice />} />

        {/* </Route> */}
        <Route
          path="/order-details-check-verify-number/:id/:number/:code"
          element={<OrderDetailsCheckVerifyNumber />}
        />
        <Route path="/special-offer/:id" element={<SpecialOffer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default RouterConfig;

function WithLandingLayout() {
  return (
    <LandingLayout>
      <Outlet />
    </LandingLayout>
  );
}

function WithAuthLayout() {
  const { userToken } = useAuthContext();
  return userToken ? (
    <Navigate to="/" />
  ) : (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

function WithAuthLayoutBranch() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

function PrivateOutlet() {
  const { userToken } = useAuthContext();
  /////////
  return userToken ? (
    <WithBaseLayout>
      <Outlet />
    </WithBaseLayout>
  ) : (
    <Navigate to={`/register?returnUrl=${window.location.pathname}`} />
  );
}

function PrivateBranchOutlet() {
  const { branchToken } = useAuthContext();
  /////////
  return branchToken ? (
    <Outlet />
  ) : (
    <Navigate to={`/branch-login?returnUrl=${window.location.pathname}`} />
  );
}

function WithBaseLayout() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}
