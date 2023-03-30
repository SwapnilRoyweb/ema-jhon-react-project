import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

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

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;