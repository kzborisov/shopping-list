import React from 'react'
import Checkbox from './Checkbox'
import { BsTrash } from 'react-icons/bs'

const Product = ({ item, handleClick, handleDeleteItem }) => {
    return (
        <div className='flex justify-between items-center w-full p-4 border-b-2 border-gray-400'>
            <div className='flex gap-4 items-center justify-center'>

                <Checkbox
                    item={item}
                    handleClick={handleClick}
                />
                <p className={`${item.isBought && 'line-through opacity-50'} text-left text-xl font-medium text-gray-500`}>{item.product}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <p className={`${item.isBought && 'line-through opacity-50'} text-gray-600 text-xl font-normal`}>{item.quantity}</p>
                <p className='text-gray-600 text-xl font-normal mx-2 cursor-pointer'>
                    <BsTrash onClick={() => handleDeleteItem(item)} />
                </p>
            </div>


        </div>
    )
}

export default Product
