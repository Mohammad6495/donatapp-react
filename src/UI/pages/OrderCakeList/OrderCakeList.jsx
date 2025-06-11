import React from 'react'
import OrderItem from '../Orders/components/OrderItem'

const OrderCakeList = () => {
  return (
    <div className='d-flex flex-column w-100'>
        {
            [0, 1, 2, 3, 4, 5].map((item, index)=>(
             <OrderItem key={index}/>
            ))
        }
    </div>
  )
}

export default OrderCakeList