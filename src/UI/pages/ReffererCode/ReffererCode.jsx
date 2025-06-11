import React, { useEffect, useState } from 'react'

import headerLogo from '../../../assets/images/CaroLogo/headerLogo.png'
import { apiCaller } from '../../../core/custom-hooks/useApi';
import { account_apiCalls } from '../../../core/services/agent';

import { useLoadingContext } from '../../../core/contexts/LoadingContext/LoadingContext';
import { MdContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import './styles.scss'
import { Button } from '@mui/material';

const ReffererCode = () => {
    const { handleClose, handleOpen } = useLoadingContext()
    const [reffererCode, setReffererCode] = useState();
    const [Loading, setLoading] = useState(false);

    const handleGetReffererCode = () => {
        apiCaller({
            api: account_apiCalls.apiCall_getreffercode,
            onSuccess: (resp) => {
                if (resp?.status == 200 && resp?.data?.status == 1) {
                    setReffererCode(resp?.data?.data)
                }
            },
            onStart: handleOpen,
            onEnd: handleClose
        })
    }

    useEffect(() => {
        handleGetReffererCode()
    }, [])

    const handleCopyCode = () => {
        navigator.clipboard.writeText(reffererCode);
        toast.info('کد دعوت کپی شد!')
    }

    const handleShare = () => {
        apiCaller({
            api: account_apiCalls.apiCall_getreffertext,
            onSuccess: (resp) => {
                if (resp?.status == 200 && resp?.data?.status == 1) {
                    if (navigator.share) {
                        navigator.share({
                            title: 'کد دعوت دونات',
                            text: `${resp?.data?.data}`,
                            url: 'https://caropastry.com',
                        })
                            .then(() => console.log('Shared successfully'))
                            .catch((error) => console.error('Error sharing:', error));
                    } else {
                        console.log('Sharing not supported');
                    }
                }
            },
            onEnd: () => setLoading(false),
            onStart: () => setLoading(true)
        })
    }
    return (
        <div className='d-flex flex-column w-100 position-relative'>
            <img src={headerLogo} className='img-fluid p-5' />
            <div className='text-info w-100 d-flex justify-content-center'>
                <p style={{ textAlign: 'center' }} className='text-muted  fs-7 text-justify fw-bold'>شما میتوانید دوستان خود را با کد زیر به دونات معرفی کنید.</p>
            </div>
            <div className='d-flex w-100 justify-content-center mt-5'>
                <div className='code-box d-flex align-items-center justify-content-between col-6 text-center'>
                    <div className='d-flex align-items-center'><span className='text-muted fs-8'>کد دعوت : </span><span className='fw-bold fs-7'>{reffererCode} </span>
                    </div>
                    <button onClick={handleCopyCode} className='copy-btn'>
                        <MdContentCopy color='#CB7640' fontSize={18} />
                    </button>
                </div>
            </div>
            <div
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    margin: '0 auto',
                    maxWidth: '576px',
                    left: '0',
                    right: '0'
                }}
                className='px-3'
            >
                <Button
                    onClick={handleShare}
                    variant='contained' className='w-100 py-2' color='primary'>
                    <span>{Loading ? 'صبر کنید...' : 'ارسال دعوت نامه'}</span>
                </Button>
            </div>
        </div>
    )
}

export default ReffererCode