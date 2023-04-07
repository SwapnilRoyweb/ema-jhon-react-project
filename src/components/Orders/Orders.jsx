import React, { useState } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

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
                <Cart handleClearCart={handleClearCart} cart={cart}>
                    <Link className='checkout-link' to="/checkout">
                        <button className='btn-checkout'><span>Checkout</span><FontAwesomeIcon icon={faCartShopping} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;