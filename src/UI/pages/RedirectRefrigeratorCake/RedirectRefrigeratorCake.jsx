import React, { useEffect, useState } from 'react'
import { apiCaller } from '../../../core/custom-hooks/useApi';
import { refrigeratorCake_apiCalls } from '../../../core/services/agent';
import { useLoadingContext } from '../../../core/contexts/LoadingContext/LoadingContext';
import { useNavigate, useParams } from 'react-router';
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { formatNumber } from '../../../core/utility/helperFunctions';
import soldImage from '../../../assets/images/sold.png'
import { toast } from 'react-toastify';
import { useShopBasketContext } from '../../../core/contexts/ShopBasket/shopBasket.ctx';
import { Button } from '@mui/material';

const RedirectRefrigeratorCake = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { handleOpen, handleClose } = useLoadingContext()
    const { refrigeratorProducts_methods, addItem, shopBasketData } =
        useShopBasketContext();
    const [cake, setCake] = useState();
    const [userTextLength, setUserTextLength] = useState(0);
    const [textAreaIsOpen, setTextAreaOpen] = useState(false);
    const handleOpenTextArea = () => {
        setTextAreaOpen((o) => !o);
    };
    //////////////////
    const [imageNotLoaded, setImageNotLoaded] = useState(false);
    const onImageNotLoaded = (e) => {
        setImageNotLoaded(true);
    };


    const getDetailCake = () => {
        apiCaller({
            api: refrigeratorCake_apiCalls.apiCall_directrefrigeratorcakedetail,
            apiArguments: {
                cakeId: id
            },
            onSuccess: (resp) => {
                if (resp.status === 200 && resp.data.statusCode == 200) {
                    setCake(resp?.data?.data)
                }
            },
            onStart: handleOpen,
            onEnd: handleClose,
        })
    }

    useEffect(() => {
        if (id) {
            getDetailCake()
        }
    }, [id])

    const [shouldGoToBasket, setShouldGoToBasket] = useState(false);
    const [selectedCakeId, setSelectedCakeId] = useState();

    const handleNavigateToRegisterOrder = (id) => {
        setSelectedCakeId(id);

        if (refrigeratorProducts_methods.getItem(id)) {
            navigate('/checkout-cart');
        } else {
            if (!refrigeratorProducts_methods.doesExists(selectedCakeId)) {
                const rd = new Date().getTime() + 1000 * 60 * 10;
                addItem({
                    cartItemType: 0,
                    refrigeratorCakeId: id,
                    reservationDate: rd,
                });
                setShouldGoToBasket(true);
                navigate('/checkout-cart')
            } else {
                setShouldGoToBasket(true);
            }
        }
    };

    return (
        <div dir="ltr" className="w-100 bg-white p-3 mt-2 pt-0">
            <div dir="rtl" className="w-100 ">
                <div className="image-holder positon-relative d-flex justify-content-center align-items-center">
                    {/* <img
              style={{ maxHeight: "350px" }}
              className="w-100"
              src={image}
              alt="NO_PIC"
            /> */}
                    {
                        cake?.isSold &&
                        <div
                            style={{
                                position: 'absolute'
                            }}
                        >
                            <img src={soldImage} className='img-fluid' alt="" />
                        </div>
                    }
                    <img
                        alt="NO_PIC"
                        className={(imageNotLoaded ? "d-none" : "") + " rounded "}
                        onError={onImageNotLoaded}
                        src={cake?.image}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            maxHeight: "45vh",
                        }}
                    />
                    <span
                        id={"img_" + id}
                        className={(!imageNotLoaded ? "d-none" : "") + " "}
                    >
                        <ImageNotSupportedIcon
                            htmlColor="#CB764073"
                            sx={{
                                fontSize: "50vw",
                                maxWidth: "300px",
                                maxHeight: "300px",
                            }}
                        />
                    </span>
                </div>
                <div className="d-flex justify-content-start align-items-center px-2">
                    <span className="fw-bold mt-4 mb-2 text-caro-primary">{cake?.title}</span>
                </div>
                {/* ********** توضیحات ********** */}
                <div className="d-flex flex-column justify-content-center align-items-start px-2">
                    <span className="fs-8">توضیحات : </span>
                    <div className="fs-7 text-justify">
                        <div dangerouslySetInnerHTML={{ __html: cake?.sizeDescription }} />
                        <div dangerouslySetInnerHTML={{ __html: cake?.description }} />
                    </div>
                </div>
                {/* ********** وزن تقریبی ********** */}
                <div className=" my-2 d-flex flex-column justify-content-center align-items-start">
                    <span className="text-caro-primary fs-8 mb-1"> وزن : </span>
                    {`${formatNumber(cake?.exactWeight || 0)} گرم`}
                </div>
                {/* ********** مواد تشکبل دهنده ********** */}
                {/* {cake?.materials && (
            <div className="d-flex flex-column justify-content-center align-items-start">
              <span className="text-caro-primary fs-8 mb-1">
                مواد تشکیل دهنده :{" "}
              </span>
              <div className="d-flex justify-content-start align-items-center gap-2 ">
                {materials?.split(",").map((it) => (
                  <span>{it}</span>
                ))}
              </div>
            </div>
          )} */}
                {/* ********** تگ ها ********** */}
                {cake?.tags && (
                    <div className="my-2 d-flex flex-column justify-content-center align-items-start">
                        <span className="text-caro-primary fs-8 mb-1">تگ ها : </span>
                        <div className="d-flex justify-content-start align-items-center gap-2 ">
                            {cake?.tags?.split("،").map((it) => (
                                <span>{it}</span>
                            ))}
                        </div>
                    </div>
                )}
                {/* ********** ارسال رایگان ********** */}
                {cake?.sendFree && (
                    <div className="my-3">
                        <CakeItemBadge text="ارسال رایگان" badgeColor="greenChocolate" />
                    </div>
                )}
                {/* ********** هزینه بیعانه  ********** */}
                {
                    cake?.priceNoDiscount > 0 ?
                        <>
                            <div className=" my-2 d-flex flex-column justify-content-center  align-items-start">
                                <span className="text-caro-primary fs-8 mb-1"> قیمت فروش : </span>
                                <div className='position-relative'>
                                    <span
                                        style={{
                                            position: "absolute",
                                            height: "2px",
                                            width: "110%",
                                            right: "-5px",
                                            left: "0",
                                            backgroundColor: "red",
                                            top: "12px",
                                        }}
                                    ></span>
                                    {`${formatNumber(cake?.priceNoDiscount)} تومان`}
                                </div>
                            </div>
                            <div className=" my-2 d-flex flex-column justify-content-center  align-items-start">
                                <span className="text-caro-primary fs-8 mb-1"> هزینه پرداخت : </span>

                                {`${formatNumber(cake?.price)} تومان`}

                            </div>
                        </>
                        :
                        <div className=" my-2 d-flex flex-column justify-content-center align-items-start">
                            <span className="text-caro-primary fs-8 mb-1"> هزینه : </span>
                            {`${formatNumber(cake?.price)} تومان`}
                        </div>
                }

                {/* ...................... */}
                {/* ********** نوشته‌ی روی کیک ********** */}
                {
                    <>
                        {cake?.canWriteOnCake && (
                            <div className="d-flex flex-column mb-2 mt-3">
                                <div className="d-flex w-100">
                                    <span
                                        className={`text-area-btn ${textAreaIsOpen === true ? "is-open" : "is-close"
                                            }`}
                                        onClick={handleOpenTextArea}
                                    />
                                    <span className="fs-8 ms-1">
                                        آیا می خواهید با متن دلخواه ٬ کیک را سفارش دهید؟
                                    </span>
                                </div>
                                <div
                                    className="text-area-holder mt-2 w-100 "
                                // className={`text-area-holder mt-2 w-100 d-block ${
                                //   textAreaIsOpen === true
                                //     ? "text-area-is-open"
                                //     : "text-area-is-closed"
                                // }`}
                                >
                                    <form className="m-0 p-0">
                                        <textarea
                                            style={{
                                                border: `1px solid ${textAreaIsOpen ? "rgba(151, 48, 121, 0.4)" : "#dfdfdf"
                                                    }`,
                                            }}
                                            disabled={!textAreaIsOpen}
                                            className="p-2"
                                            onChange={(e) => {
                                                handleTypingTextArea(`cake_${id}`, e);
                                                setUserTextLength(e.target.value.length);
                                            }}
                                            id={"tomorrow-cake-text-area-" + id}
                                            value={cake?.textAreaText[`cake_${id}`]}
                                            maxlength={cake?.textLength ?? 100}
                                        />

                                        <small>
                                            {userTextLength}/{cake?.textLength}
                                        </small>
                                    </form>
                                </div>
                            </div>
                        )}
                    </>
                }
            </div>
            {
                cake?.isSold &&
                <Button onClick={() => navigate('/')} className='w-100 mb-2' variant='contained' color='primary'>
                    <span>برگشت به خانه</span>
                </Button>
            }
            <Button disabled={cake?.isSold} onClick={() => handleNavigateToRegisterOrder(cake?.id)} className='w-100' variant='contained' color='primary'>
                <span>افزودن به سبد خرید</span>
            </Button>
        </div>
    )
}

export default RedirectRefrigeratorCake