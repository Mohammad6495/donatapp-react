import React, { useEffect, useState } from 'react'
import { formatPrice, toEnglishDigit } from '../../../../../core/utility/utils'

import './styles/styles.scss';
import { Button, Dialog } from '@mui/material';
import { Close, Warning } from '@mui/icons-material';
import { apiCaller } from '../../../../../core/custom-hooks/useApi';
import { account_apiCalls } from '../../../../../core/services/agent';
import { useNavigate } from 'react-router';
import { useLoadingContext } from '../../../../../core/contexts/LoadingContext/LoadingContext';
import { toast } from 'react-toastify';

const MyWallet = () => {
    const navigate = useNavigate()
    const { handleOpen, handleClose } = useLoadingContext()
    const [priceValueIndex, setPriceValueIndex] = useState();
    const [priceValueInput, setPriceValueInput] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    const [balanceValue, setBalanceValue] = useState()

    const handleSetPricesValueindex = (index) => {
        if (index == priceValueIndex) {
            setPriceValueIndex(undefined)
        } else[
            setPriceValueIndex(index)
        ]
    }

    useEffect(() => {
        if (priceValueIndex) {
            setPriceValueInput('')
        }
    }, [priceValueIndex]);

    const getBalanceValue = () => {
        apiCaller({
            api: account_apiCalls.apiCall_getbalance,
            onSuccess(resp) {
                if (resp?.status == 200 && resp?.data?.status == 1) {
                    setBalanceValue(resp?.data?.data)
                }
            }
        })
    }

    useEffect(() => {
        getBalanceValue()
    }, [])

    const handlePayWallet = () => {
        apiCaller({
            api: account_apiCalls.apiCall_increasebalance,
            apiArguments: pricesValue.find(a => a.id == priceValueIndex)?.price
                ??
                Number(String(priceValueInput).replace(/,/g, '')),
            onSuccess: (resp) => {
                if (resp?.status == 200 && resp?.data?.status == 1) {
                    navigate(
                        `/gateway-redirect?url=${resp.data?.data.gatewayTransporter.descriptor.url}`
                    );
                }
            },
            onStart: handleOpen,
            onEnd: handleClose
        })
    }

    return (
        balanceValue > 0 &&
        <>
            <span className="user-current-address-text">کیف پول</span>

            <div className='d-flex flex-column w-100 walet-contain'>
                <div className='d-flex align-items-center'>
                    <h6 style={{ color: '#CB7640', fontSize: '15px' }} className='mb-0 fw-bold'>اعتبار من : </h6><span className='mt-1 ms-1' style={{ color: '#CB7640', fontSize: '14px' }}>{formatPrice(balanceValue)} تومان</span>
                </div>
                <div className='d-flex align-items-center mt-3'>
                    {
                        pricesValue.map(item => (
                            <div onClick={() => handleSetPricesValueindex(item?.id)} className='col-4 px-1 text-center'>
                                <div
                                    style={{
                                        backgroundColor: priceValueIndex == item?.id ? 'rgb(241, 221, 236)' : '#fff',
                                    }}
                                    className='prices-item  p-1' key={item?.id}>
                                    <span style={{ fontSize: '14px' }}>{formatPrice(item?.price)} تومان</span>
                                </div>
                            </div>

                        ))
                    }
                </div>
                <div className='d-flex align-items-center mt-3'>
                    <div className='col-4'>
                        <Button onClick={() => {
                            if (!priceValueInput && !priceValueIndex) {
                                toast.warn('لطفا مبلغ خود را مشخص کنید')
                            } else {
                                setShowDialog(!showDialog)
                            }
                        }} style={{ fontSize: '12px' }} variant='contained' color='primary'>افزایش اعتبار</Button>
                    </div>
                    <div className='col-8'>
                        <input
                            onKeyPress={(e) => {
                                const reg1 = new RegExp('^[0-9]+$')
                                const reg2 = new RegExp('^[۰-۹]+$')
                                if (!reg1.test(e.key) && !reg2.test(e.key)) {
                                    e.preventDefault()
                                }
                                return
                            }}
                            value={priceValueInput} disabled={priceValueIndex ? true : false} className='form-control' onChange={(e) => {
                                const rawValue = e.target.value.replace(/\D/g, '');
                                setPriceValueInput((formatPrice(toEnglishDigit(rawValue)) || ''));
                            }} placeholder='مبلغ خود را وارد کنید' />
                    </div>
                </div>
                <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                    <div className="p-3 bg-white w-100 h-100">
                        <span
                            className=" cursor-pointer"
                            onClick={() => setShowDialog(false)}
                        >
                            <Close color="error" />
                        </span>
                        <div className="mt-1 p-2">
                            <span>کاربر گرامی برای شارژ کیف پول پرداخت خود را نهایی کنید!</span>
                            <div className='w-100 mt-3'>
                                <span>هزینه پرداختی: </span>
                                <span className='fw-bold' style={{ color: '#CB7640' }}>{formatPrice(
                                    pricesValue.find(a => a.id == priceValueIndex)?.price
                                    ??
                                    Number(String(priceValueInput).replace(/,/g, ''))
                                )} تومان</span>
                            </div>
                        </div>
                        <Button onClick={handlePayWallet} className='w-100 mt-2' variant='contained' color='primary'>
                            <span style={{ fontSize: '13px' }}>پرداخت</span>
                        </Button>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default MyWallet;


const pricesValue = [
    {
        id: 1,
        price: 50000
    },
    {
        id: 2,
        price: 100000
    },
    {
        id: 3,
        price: 200000
    }
]