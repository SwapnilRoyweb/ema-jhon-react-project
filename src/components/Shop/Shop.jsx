import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // console.log(storedCart);
        //step 1
        for(const id in storedCart){
            // console.log(id);
            //step 2
            const savedProduct = products.find(product => product.id === id);
            // console.log(savedProduct);
            if(savedProduct){
                //step 3
                const quantity = storedCart[id];
                savedProduct.quantity = quantity;
                //step 4
                savedCart.push(savedProduct);
            }
        }
        //step 5
        setCart(savedCart);
    }, [products]);

    const handleAddToCart = (product) => {
        // console.log('product added', product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart} handleClearCart={handleClearCart}>
                <Link className='review-link' to="/orders">
                    <button className='btn-review'><span>Review Order</span>
                    <FontAwesomeIcon icon={faCartShopping} /></button>
                </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;