import React, { useState } from 'react'
import Checkbox from './Checkbox'

const Product = ({ item }) => {
    const [checked, setChecked] = useState(false)
    const handleClick = () => {
        setChecked(prev => !prev)
    }

    return (
        <div className='flex justify-between w-full p-4 border-b-2 border-gray-400'>
            <div className='flex gap-4 items-center justify-center'>
                <Checkbox handleClick={handleClick} checked={checked} />
                <p className={`${checked && 'line-through opacity-50'} text-left text-xl font-medium text-gray-500`}>{item.product}</p>
            </div>
            <p className={`${checked && 'line-through opacity-50'} text-gray-600 text-xl font-normal`}>{item.qty}</p>
        </div>
    )
}

export default Product