import React from 'react'

const Form = ({ handleSubmit, onChangeProduct, onChangeQty, inputRef }) => {
    return (
        <form
            className='p-4 w-full flex flex-col items-center justify-center'
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                placeholder='Product'
                className='mb-4 p-2 w-full border-b-2 focus:outline-none focus:border-b-2 focus:border-b-orange-400 focus:drop-shadow-lg'
                name='product'
                ref={inputRef}
                onChange={onChangeProduct}
            />
            <input
                type='number'
                placeholder='Quantity'
                className='mb-4 p-2 w-full border-b-2 focus:outline-none focus:border-b-2 focus:border-b-orange-400 focus:drop-shadow-lg'
                name='qty'
                onChange={onChangeQty}
            />

            <button
                type='subit'
                className="px-4 py-3 bg-orange-400 rounded-2xl text-white font-medium text-3xl focus:outline-none leading-5 hover:drop-shadow-xl ease-in-out duration-w00"
            >
                +
            </button>
        </form>
    )
}

export default Form