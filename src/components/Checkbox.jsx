import React, { useState } from 'react'

const Checkbox = ({ item, handleClick }) => {
    const handleChange = () => {
        handleClick(item)
    }

    return (
        <div>
            <input
                className='border-2 border-solid border-orange-400 rounded-md p-2 cursor-pointer appearance-none bg-white relative text-white'
                type='checkbox'
                checked={item.isBought}
                onChange={handleChange}
            />
        </div>
    )
}

export default Checkbox