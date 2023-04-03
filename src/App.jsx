import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="flex flex-col">
            <h1 className='text-3xl font-bold underline'>What should I buy today</h1>
        </div>
    )
}

export default App
