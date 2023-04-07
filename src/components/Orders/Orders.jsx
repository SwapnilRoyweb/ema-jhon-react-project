import React, { useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemoveCart = (id) => {
        // console.log(id);
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem product= {product} key={product.id}handleRemoveCart={handleRemoveCart}></ReviewItem>)
                }
            </div>
            <div>
                <Cart handleClearCart={handleClearCart} cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;