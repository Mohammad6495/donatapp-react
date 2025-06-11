// import React, { useRef, useState, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import { Icon } from "leaflet";
// import marker from "../../../assets/images/colorPin.png";
// import { Form, Formik } from "formik";
// import { FomikMUITextInput } from "../../components/formik-input/formikMuiInput.component";
// import FormikMUITextArea from "../../components/formik-textArea/formikMuiTextArea.component";
// import OrdinaryButton from "../../components/OrdinaryButton/OrdinaryButton";
// import { customerAddress_apiCalls } from "../../../core/services/agent";
// import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
// import { apiCaller } from "../../../core/custom-hooks/useApi";
// import { useLocation, useNavigate, useParams } from "react-router";
// import * as Yup from "yup";
// import { useCheckProfileStatus } from "../../../core/utility/checkUserProfileStatus";
// import "./styles/AddingAddress.scss";
// import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
// import http from "../../../core/services/http";
// import { locationSearchStringToObject } from "../../../core/utility/utils";
// import { useGetUserLocationHook } from "../../../core/utility/helperFunctions";
// import { toast } from "react-toastify";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import { IconButton } from "@mui/material";

// const formSchema = Yup.object().shape({
//   userAddress: Yup.string()
//     .required("آدرس الزامی است")
//     .test(
//       "len",
//       "تعداد کاراکترها باید کمتر از 100 باشد",
//       (val) => val?.length < 100
//     ),
// });

// const AddingAddress = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const mapRef = useRef();
//   // Map Position state
//   const [centerPosition, setCenterPosition] = useState();
//   const { set_userToken } = useAuthContext();
//   ////
//   const { handleOpen, handleClose } = useLoadingContext();
//   const [userAddress, setUserAddress] = useState();
//   const [postalCode, setPostalCode] = useState();
//   const [coordinates, setCoordinates] = useState({});
//   const [returnUrl, setReturnUrl] = useState();

//   const location = useLocation();

//   // getUserPosition
//   const [userLocation, setUserLocation] = useState();
//   const { userLatLng, userHasLocation } = useGetUserLocationHook();
//   // const setUserLocation = () => {
//   //   const map = useMapEvents({
//   //     click(e) {
//   //       setCoordinates(userLatLng);
//   //       setCenterPosition([userLatLng?.lat, userLatLng?.lng]);
//   //       map.flyTo(userLatLng, map.getZoom());
//   //     },
//   //   });

//   //   return <></>;
//   // };
//   // useEffect(() => {
//   //   const { current = {} } = mapRef;
//   //   const { leafletElement: map } = current;
//   //   map.locate({
//   //   setView: true,
//   //   });
//   //   map.on('locationfound', handleOnLocationFound);
//   // }, []);
//   function handleLocateUser() {
//     navigator?.geolocation?.getCurrentPosition(
//       // Success
//       (resp) => {
//         setUserLocation({
//           lat: resp.coords.latitude,
//           lng: resp.coords.longitude,
//         });
//       },
//       // Error
//       (err) => {}
//     );
//     // const { current = {} } = mapRef;
//     // const { leafletElement: map } = current;
//     // // const userLatLng = { lat: "36.54281568682346", lng: "53.01228299322737" };
//     // // setCoordinates(userLatLng);
//     // // setCenterPosition([userLatLng?.lat, userLatLng?.lng]);
//     // // map.flyTo(userLatLng, map.getZoom());
//     // map.locate().on("locationfound", function (e) {
//     //   setCoordinates(userLatLng);
//     //   setCenterPosition([userLatLng?.lat, userLatLng?.lng]);
//     //   map.flyTo(userLatLng, map.getZoom());
//     // });
//   }

//   // Handle Get Return Url
//   const getReturnUrl = () => {
//     const returnedUrl = location?.search.replace("?returnUrl=", "");
//     setReturnUrl(returnedUrl);
//   };

//   useEffect(() => {
//     getReturnUrl();
//   }, [location]);

//   const myIcon = new Icon({
//     iconUrl: marker,
//     iconSize: [32, 32],
//   });

//   // Change Center Position
//   function ChangeCenterPosition() {
//     const map = useMapEvents({
//       click(e) {
//         setCoordinates(e?.latlng);
//         setCenterPosition([e.latlng.lat, e.latlng.lng]);
//         map.flyTo(e.latlng, map.getZoom());
//       },
//     });

//     return <></>;
//   }

//   // Get Customer Address Detail
//   const getCustoemerAddressDetail = () => {
//     apiCaller({
//       api: customerAddress_apiCalls.apiCall_customerAddressDetail,
//       apiArguments: id?.toString(),
//       onSuccess: (resp) => {
//         if (resp.status === 200 && resp.data.statusCode === 200) {
//           setUserAddress(resp?.data?.data);
//           if (resp?.data?.data?.lat && resp?.data?.data?.long) {
//             setCenterPosition([resp?.data?.data?.lat, resp?.data?.data?.long]);
//             setCoordinates({
//               lat: resp?.data?.data?.lat,
//               lng: resp?.data?.data?.long,
//             });
//           } else {
//             setCenterPosition(["36.46382124745137", "52.85792368850813"]);
//             setCoordinates({
//               lat: "36.46382124745137",
//               lng: "52.85792368850813",
//             });
//           }
//         }
//       },
//       onError: (err) => {},
//       onStart: handleOpen,
//       onEnd: handleClose,
//     });
//   };

//   //
//   useEffect(() => {
//     if (window?.location?.pathname?.includes("edit-address")) {
//       getCustoemerAddressDetail();
//     }
//   }, [id]);

//   //
//   const onPostalCodeChange = (e) => {
//     const val = e.target.value;
//     setPostalCode(val);
//   };

//   //
//   const { checkProfileStatus } = useCheckProfileStatus();
//   // Submit Function - Add Address

//   const handleSubmitSendAddress = (values) => {
//     if (postalCode && postalCode?.length < 10) {
//       toast.error("کدپستی باید 10 رقمی باشد .");
//       return;
//     }
//     const obj = {
//       id: id,
//       address: values?.userAddress,
//       postalCode: postalCode ?? "",
//       lat: coordinates?.lat?.toString() ?? "36.46382124745137",
//       long: coordinates?.lng?.toString() ?? "52.85792368850813",
//     };
//     apiCaller({
//       api: customerAddress_apiCalls.apiCall_createCustomerAddress,
//       apiArguments: obj,
//       onSuccess: (resp) => {
//         if (resp.status === 200 && resp.data.status == 1) {
//           if (resp.data?.data?.hasToken) {
//             set_userToken(resp.data?.data.token);
//             http.setToken(http.tokenKey, resp.data?.data.token);
//           }
//           const ru =
//             locationSearchStringToObject(location.search)?.returnUrl ?? "";
//           checkProfileStatus({
//             onContinueAllowed: () => {
//               if (!ru) {
//                 navigate(`/`, { replace: true });
//               } else {
//                 if (ru.includes("/checkout-cart")) {
//                   if (resp.data?.data?.id) {
//                   }
//                   navigate(`${ru}?newAddressId=${resp.data?.data?.id ?? ""}`, {
//                     replace: true,
//                   });
//                 } else {
//                   navigate(`${ru}?backUrl=/`, { replace: true });
//                 }
//               }
//             },
//           });
//           // setTimeout(() => {

//           // }, 500);
//         }
//       },
//       onError: (err) => {},
//       onStart: handleOpen,
//       onEnd: handleClose,
//     });
//   };

//   // Submit Function - Edit Address
//   const handleSubmitEditAddress = (values) => {
//     if (postalCode && postalCode?.length < 10) {
//       toast.error("کدپستی باید 10 رقمی باشد .");
//       return;
//     }
//     const obj = {
//       id: id,
//       address: values?.userAddress,
//       postalCode: postalCode ?? "",
//       lat: coordinates?.lat?.toString() ?? "36.46382124745137",
//       long: coordinates?.lng?.toString() ?? "52.85792368850813",
//     };
//     apiCaller({
//       api: customerAddress_apiCalls.apiCall_editCustomerAddress,
//       apiArguments: obj,
//       onSuccess: (resp) => {
//         if (resp.status === 200 && resp.data.statusCode === 200) {
//           navigate(`/profile`);
//         }
//       },
//       onError: (err) => {},
//       onStart: handleOpen,
//       onEnd: handleClose,
//     });
//   };

//   // Allow Render Map
//   const allowRenderMap = () => {
//     if (centerPosition) return true;
//     else return false;
//   };

//   useEffect(() => {
//     if (window?.location?.pathname?.includes("add-address")) {
//       setCenterPosition(["36.46382124745137", "52.85792368850813"]);
//     }
//   }, []);

//   return (
//     <section className="d-flex flex-column w-100">
//       <div className="d-flex flex-column justify-content-start align-items-stretch">
//         <div className="add-address-map-holder w-100">
//           {allowRenderMap() && (
//             <MapContainer
//               ref={mapRef}
//               className="w-100 h-100"
//               center={centerPosition}
//               zoom={14}
//             >
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
//               />
//               <ChangeCenterPosition />
//               <Marker position={centerPosition} icon={myIcon}>
//                 <Popup>"آدرس"</Popup>
//               </Marker>
//               <Locate
//                 setCoordinates={setCoordinates}
//                 setCenterPosition={setCenterPosition}
//                 userLatLng={userLocation}
//               />
//             </MapContainer>
//           )}
//         </div>
//         {userAddress && (
//           <div className="my-2">
//             آدرس تقریبی :<span className="fs-8">{userAddress?.address}</span>
//           </div>
//         )}
//         <div className="w-100 align-self-start position-relative">
//           <IconButton
//             className="align-self-start p-1 bg-white"
//             style={{
//               position: "absolute",
//               top: "-60px",
//               right: "10px",
//               zIndex: "999999",
//             }}
//             onClick={handleLocateUser}
//           >
//             <MyLocationIcon color="primary" />
//           </IconButton>
//         </div>
//         <div dir="rtl d-flex flex-column justify-content-center align-items-center mt-3">
//           <Formik
//             enableReinitialize
//             initialValues={{
//               userAddress: userAddress?.address || "",
//             }}
//             validationSchema={formSchema}
//             onSubmit={
//               window.location.pathname.includes("edit-address")
//                 ? handleSubmitEditAddress
//                 : handleSubmitSendAddress
//             }
//           >
//             <Form dir="rtl">
//               <div dir="rtl" className="d-flex flex-column mt-3">
//                 <FormikMUITextArea
//                   textAreaStyle={{ maxHeight: "100px", minHeight: "100px" }}
//                   formcontrolprops={{
//                     variant: "standard",
//                     className: "w-100",
//                   }}
//                   labelText="آدرس *"
//                   labelprops={{
//                     className: "",
//                     color: "",
//                     style: { color: "rgba(0, 0, 0, 0.6)" },
//                   }}
//                   textAreaProps={{
//                     className: "py-2 px-3 mt-2",
//                     id: "userAddress",
//                     name: "userAddress",
//                     color: "",
//                   }}
//                 />
//               </div>
           
//               <OrdinaryButton
//                 holderClasses="mt-3"
//                 buttonText="ثبت تغییرات"
//                 buttonType="submit"
//               />
//             </Form>
//           </Formik>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddingAddress;

// function Locate({ setCoordinates, setCenterPosition, userLatLng }) {
//   const map = useMap();
//   useEffect(() => {
//     if (userLatLng && userLatLng?.length > 0) {
//       setCoordinates(userLatLng);
//       setCenterPosition([userLatLng?.lat, userLatLng?.lng]);
//       map.flyTo(userLatLng, map.getZoom());
//     }
//   }, [userLatLng]);
//   // const handleLocate = () => {
//   //   map.locate().on("locationfound", function (e) {
//   //     setCoordinates(e.latlng);
//   //     setCenterPosition([e.latlng?.lat, e.latlng?.lng]);
//   //     map.flyTo(userLatLng, map.getZoom());
//   //   });
//   // };
//   //
//   return (
//     <>
//       {/* <button
//         onClick={handleLocate}
//         style={{
//           position: "absolute",
//           zIndex: "999999",
//         }}
//       >
//         locate
//       </button> */}
//     </>
//   );
// }
