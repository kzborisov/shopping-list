import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Product from './components/Product'
import Form from './components/Form'
import uuid from 'react-uuid'

function App() {
    const [items, setItems] = useState([]);
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current && inputRef.current.focus();
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const product = e.target.product.value
        const qty = e.target.qty.value

        if (!product) {
            alert('Please fill in the product')
            return
        }
        setItems(
            [...items, { id: uuid(), product, qty, bought: false }]
                .sort((a, b) => a.bought - b.bought))
        e.target.product.value = ''
        e.target.qty.value = ''
        focusInput()
    }

    const handleCheckboxClick = (item) => {
        const updatedItems = items
            .map(i => item.id === i.id
                ? { ...i, bought: !item.bought } : i)
            .sort((a, b) => a.bought - b.bought);
        setItems(updatedItems);
    }

    return (
        <div className="flex flex-col m-auto mt-10 p-4 drop-shadow-xl min-w-[350px] md:w-[550px] lg:w-[350px] bg-gray-100 rounded">
            <h1 className='text-left text-gray-600 text-2xl font-semibold capitalize m-8'>Shopiping List</h1>
            {items.map((item) => (
                <React.Fragment key={item.id}>
                    <Product item={item} handleClick={handleCheckboxClick} />
                </React.Fragment>
            ))}
            <Form handleSubmit={handleFormSubmit} inputRef={inputRef}/>
        </div>
    )
}
;
export default App
