import React, { useEffect, useRef, useState } from 'react'
import Product from './components/Product'
import Form from './components/Form'
// import uuid from 'react-uuid'
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

function App() {
    const [items, setItems] = useState([]);
    const [newProduct, setNewProduct] = useState('');
    const [newQuantity, setNewQuantity] = useState('');

    const inputRef = useRef(null);

    // Firebase/firestore
    const listCollectionRef = collection(db, 'shopping-list');

    const getLists = async () => {
        const data = await getDocs(listCollectionRef);
        setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((a, b) => a.isBought - b.isBought));
    }

    useEffect(() => {
        getLists();
    }, [])



    const createProduct = async (e) => {
        e.preventDefault();
        if (!e.target.product.value) {
            alert('Please fill in the product')
            return
        }
        await addDoc(listCollectionRef, { product: newProduct, quantity: newQuantity, isBought: false });
        getLists();

        e.target.product.value = ''
        e.target.qty.value = ''
        focusInput()
    }

    const onChangeProduct = (e) => {
        setNewProduct(e.target.value)
    }

    const onChangeQty = (e) => {
        setNewQuantity(e.target.value)
    }

    const handleDeleteItem = async (item) => {
        const deleteConfirmed = confirm(`(Are you sure you want to delete ${item.product}`)

        if (deleteConfirmed) {
            const itemDoc = doc(db, 'shopping-list', item.id);
            await deleteDoc(itemDoc);
            getLists();
        } else {
            return
        }
    }

    const focusInput = () => {
        inputRef.current && inputRef.current.focus();
    }

    const handleCheckboxClick = async (item) => {
        const updatedItems = items
            .map(i => item.id === i.id
                ? { ...i, isBought: !item.isBought } : i)
            .sort((a, b) => a.isBought - b.isBought);
        setItems(updatedItems);

        const itemDoc = doc(db, 'shopping-list', item.id);
        const newIsBought = { isBought: !item.isBought }
        await updateDoc(itemDoc, newIsBought);
    }

    const handleClearListClik = () => {
        setItems([]);
        items.map(async (item) => {
            const currentItem = doc(db, 'shopping-list', item.id);
            await deleteDoc(currentItem);
        })
    }

    return (
        <div className="flex flex-col items-center m-auto mt-10 p-4 drop-shadow-xl min-w-[350px] md:w-[550px] lg:w-[350px] bg-gray-100 rounded">
            <h1 className='text-left text-gray-600 text-2xl font-semibold capitalize m-8'>
                Shopping List
            </h1>
            <button
                className='font-semibold bg-orange-400 rounded-2xl text-white w-[50%] my-2 px-2 py-1 hover:drop-shadow-xl ease-in-out duration-w00'
                onClick={handleClearListClik}
            >
                Clear List
            </button>

            {items.map((item) => (
                <React.Fragment key={item.id}>
                    <Product
                        item={item}
                        handleClick={handleCheckboxClick}
                        handleDeleteItem={handleDeleteItem}
                    />
                </React.Fragment>
            ))}
            <Form
                handleSubmit={createProduct}
                onChangeProduct={onChangeProduct}
                onChangeQty={onChangeQty}
                inputRef={inputRef}
            />
        </div>
    )
}
;
export default App
