import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

const NavigateRouteOrder = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            navigate('/general-order-details/' + id)
        }
    }, [id])
    return (
        <div className='w-100 text-center'>
            <p className='mt-2'>لطفا صبر کنید...</p>
        </div>
    )
}

export default NavigateRouteOrder