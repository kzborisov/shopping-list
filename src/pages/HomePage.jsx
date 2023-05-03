import React, { useEffect, useRef, useState } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase-config'

import Product from '../components/Product'
import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
import { signOut } from 'firebase/auth'

const HomePage = () => {
    const [items, setItems] = useState([]);
    const [newProduct, setNewProduct] = useState('');
    const [newQuantity, setNewQuantity] = useState('');

    const inputRef = useRef(null);
    const listCollectionRef = collection(db, 'shopping-list');
    const navigate = useNavigate();

    useEffect(() => {
        getLists();
    }, [])

    const getLists = async () => {
        const data = await getDocs(listCollectionRef);
        console.log(data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter(item => item.userId === auth.currentUser.uid))
        setItems(data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter(item => item.userId === auth.currentUser.uid)
            .sort((a, b) => a.isBought - b.isBought));
    }

    const createProduct = async (e) => {
        e.preventDefault();
        if (!e.target.product.value) {
            alert('Please fill in the product')
            return
        }
        await addDoc(
            listCollectionRef,
            { userId: auth.currentUser.uid, product: newProduct, quantity: newQuantity, isBought: false }
        );
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
        const deleteConfirmed = confirm(`Are you sure you want to delete ${item.product}`)

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

    const handleClearListClick = () => {
        const deleteConfirmed = confirm(`Delete all items from the list?`)

        if (!deleteConfirmed) return

        setItems([]);
        items.map(async (item) => {
            const currentItem = doc(db, 'shopping-list', item.id);
            await deleteDoc(currentItem);
        })
    }

    const handleLogOut = async () => {
        await signOut(auth);
        localStorage.setItem('isSignedIn', false);
        navigate('/shopping-list/login/');
    }

    return (

        <div className='flex flex-col gap-4 min-w-[350px] md:w-[550px] lg:w-[350px] relative mx-auto'>
            <CiLogout size={30} onClick={handleLogOut} className='m-4 cursor-pointer' />
            {/* TODO: Add profile */}

            <h1 className='text-xl font-semibold text-gray-600'>
                Shopping List
            </h1>


            <div className="flex flex-col items-center p-4 drop-shadow-xl">
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

                {items.length !== 0
                    &&
                    <button
                        className='font-semibold bg-gray-600 rounded-2xl text-white w-[50%] my-2 px-2 py-1 hover:drop-shadow-xl ease-in-out duration-w00'
                        onClick={handleClearListClick}
                    >
                        Clear List
                    </button>
                }
            </div>
        </div>
    )
}

export default HomePage
