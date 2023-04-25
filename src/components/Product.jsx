import React, { useState } from 'react'
import Checkbox from './Checkbox'

const Product = ({ item, handleClick }) => {

    const onCheckboxChange = () => {
        item.bought = !item.bought;
    }

    return (
        <div className='flex justify-between w-full p-4 border-b-2 border-gray-400'>
            <div className='flex gap-4 items-center justify-center'>
                <Checkbox
                    handleClick={() => handleClick(item)}
                    bought={item.bought}
                    onChange={onCheckboxChange} />
                <p className={`${item.bought && 'line-through opacity-50'} text-left text-xl font-medium text-gray-500`}>{item.product}</p>
            </div>
            <p className={`${item.bought && 'line-through opacity-50'} text-gray-600 text-xl font-normal`}>{item.qty}</p>
        </div>
    )
}

export default Product