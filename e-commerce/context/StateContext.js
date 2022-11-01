import React, { createContext, useContext, useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'
import product from './../components/Product';

const Context = createContext();

export const StateContext = ({ children }) => {
   const [showCart, setShowCart] = useState(false);

   const [cartItems, setCartItems] = useState([]);

   const [totalPrice, setTotalPrice] = useState(0);

   const [totalQuantities, setTotalQuantities] = useState(0);

   const [qty, setQty] = useState(1);

   //function for a product that already exists in the cart
   const onAdd = (product, quantity) => {
      const checkProductInCart = cartItems.find((item) => item._id === product._id);

      setTotalPrice(
         (prevTotalPrice) => prevTotalPrice + product.price * quantity
         );

      setTotalQuantities(
         (prevTotalQuantities) => prevTotalQuantities + quantity
         );

      if (checkProductInCart) {
         //updated cart items
         const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === product._id) {
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity
               }
            }
         })

         setCartItems(updatedCartItems);
      } else {
         product.quantity = quantity

         setCartItems([...cartItems, {...product}])
      }

      
      toast.success(`${qty} ${product.name} added to the cart!!!`);
   }

   //increase and decrease functionalities on the plus and minus buttons
   const incQty = () => {
      setQty((prevQty) => prevQty + 1)
   }
   
   const decQty = () => {
      setQty((prevQty) => {
         if (prevQty - 1 < 1) {
            return 1
         } else {
            return prevQty - 1
         }
      })
   }

   return (
      <Context.Provider value={{
         showCart,
         totalPrice,
         cartItems,
         totalQuantities,
         qty,
         incQty,
         decQty,
         onAdd,
         setShowCart,
      }}>
         {children}
      </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);