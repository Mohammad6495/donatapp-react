import React from 'react'

import './styles.scss'
import { formatNumber, formatPrice } from '../../../../core/utility/helperFunctions'
import { Button } from '@mui/material'
import { FaPlusSquare } from "react-icons/fa";

const ProductExtraItem = ({
    bakeryCategoryId,
    branchId,
    code,
    createdAt,
    description,
    dessertCategoryId,
    id,
    image,
    isActive,
    isAvailable,
    price,
    productType,
    quantity,
    sendFree,
    title,
    typeTitle,
    updatedAt,
    updatedAtFormatted,
    weight,
    willSend,
    hndleSetSelectProductWithCategory,
    discountPercentage,
    oldPrice
}) => {
    return (
        <div className='product-cat-extra-item p-2 d-flex flex-wrap w-100 ' style={{ margin: '0px 15px' }}>
            <div className='col-7'>
                <div className='d-flex flex-column justify-content-between pe-2 h-100'>
                    <div className='d-flex flex-column'>
                        <h6 className='fw-bold box-info' style={{ fontSize: '13px' }}>{title}</h6>
                        <div className='d-flex align-items-center justify-content-between w-100 mt-1 mb-2'>
                            <span className='box-info fw-bold' style={{ fontSize: '14px' }}>قیمت</span>
                            <div className="d-flex flex-column mt-1">
                                {discountPercentage != 0 && (
                                    <del className="text-muted" style={{ fontSize: '16px' }}>{formatNumber(oldPrice)} تومان</del>
                                )}
                               <span className="text-caro-primary fs-6">{formatNumber(price)} تومان</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-100'>
                        <Button onClick={() => hndleSetSelectProductWithCategory({
                            bakeryCategoryId,
                            branchId,
                            code,
                            createdAt,
                            description,
                            dessertCategoryId,
                            id,
                            image,
                            isActive,
                            isAvailable,
                            price,
                            productType,
                            quantity,
                            sendFree,
                            title,
                            typeTitle,
                            updatedAt,
                            updatedAtFormatted,
                            weight,
                            willSend,
                        })} variant='contained' color='primary' className='w-100 d-flex align-items-center justify-content-between py-1' style={{ borderRadius: '10px 10px 0px 10px' }}>
                            <span className='fw-bold' style={{ fontSize: '15px' }}>افزودن</span>
                            <FaPlusSquare fontSize={19} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className='col-5 img'>
                {
                    discountPercentage != 0 &&
                    <div
                        className="fs-6"
                        style={{
                            position: "absolute",
                            top: "40px",
                            left: "17px",
                            background: "#CB7640",
                            color: "white",
                            fontWeight: "bold",
                            padding: "5px 15px",
                            fontSize: "12px",
                            transform: "rotate(-45deg)",
                            transformOrigin: "left top",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 10,
                        }}
                    >
                        ٪{discountPercentage}
                    </div>
                }
                <img src={image} />
            </div>
        </div>
    )
}

export default ProductExtraItem