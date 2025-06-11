import React from 'react'
import { useProfileContext } from '../../../core/contexts/UserProfileContext/UserProfileContext'
import caroLogo from '../../../assets/images/CaroLogo/headerLogo.png'
import { useNavigate } from 'react-router'
import { Button } from '@mui/material'
import { FaHome } from 'react-icons/fa'

const MessageFinalComment = () => {
    const { userData } = useProfileContext()
    const navigate = useNavigate()
    return (
        <div className='p-2'>
            <div className="divider mt-2 mb-3"></div>

            <h6 style={{ lineHeight: '26px' }}>{userData?.firstName + ' ' + userData?.lastName} عزیز ممنون که انتقادات و پیشنهاد خود را با ما به اشتراک گذاشتید.🙏</h6>
            <div className="divider mt-3"></div>
            <img src={caroLogo} className='img-fluid p-3' />
            <Button onClick={() => navigate('/?pageId=0')} className='mt-3 w-100 py-2 d-flex align-items-center' variant='outlined' color='primary'><FaHome fontSize={22}/> <span className='mx-1 mt-1'>بازگشت به خانه</span></Button>

        </div>
    )
}

export default MessageFinalComment