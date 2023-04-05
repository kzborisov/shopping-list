import { useState } from 'react'
import './App.css'

function App() {
    return (
        <div className="flex flex-col drop-shadow-xl bg-gray-100 p-4 m-1 rounded">
            <h1 className='text-left text-gray-600 text-2xl font-semibold capitalize m-8'>Shopiping List</h1>

            {/* Item Component */}
            <div className='flex justify-between w-full p-4 border-b-2 border-gray-400'>
                <div className='flex gap-4 items-center justify-center'>
                    <input type='checkbox' className='w-5 h-5 rounded-3xl' />
                    <p className='text-left text-xl font-medium text-gray-500'>Milk</p>
                </div>
                <p className='text-gray-600 text-xl font-normal'>1 gal</p>
            </div>
        </div>
    )
}
;
export default App
