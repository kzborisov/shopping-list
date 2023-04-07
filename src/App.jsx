import { useState } from 'react'
import './App.css'
import Product from './components/Product'
import Form from './components/Form'

{/* <BsPlusSquareFill /> */ }
function App() {
    const [items, setItems] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();

        const product = e.target.product.value
        const qty = e.target.qty.value

        if (!product) {
            alert('Please fill in the product')
            return
        } else if (!qty) {
            alert('Please fill in the quantity')
            return
        }

        setItems([...items, { product, qty }])
        e.target.product.value = ''
        e.target.qty.value = ''
    }

    return (
        <div className="flex flex-col m-auto mt-10 p-4 drop-shadow-xl min-w-[350px] md:w-[550px] lg:w-[350px] bg-gray-100 rounded">
            <h1 className='text-left text-gray-600 text-2xl font-semibold capitalize m-8'>Shopiping List</h1>


            {items.map((item, idx) => (
                <Product key={idx} item={item} />
            ))}

            <Form handleSubmit={handleSubmit} />

        </div>
    )
}
;
export default App
