import React, { createContext, useContext, useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
   const [showCart, setShowCart] = useState(false);

   const [cartItems, setCartItems] = useState([]);

   const [totalPrice, setTotalPrice] = useState(0);

   const [totalQuantities, setTotalQuantities] = useState(0);

   const [qty, setQty] = useState(1);

   let foundProduct;
   let index;

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

   //to remove a product from cart
   const onRemove = (product) => {
      foundProduct = cartItems.find((item) => item._id === product._id)

      const newCartItems = cartItems.filter((item) => item._id !== product._id)

      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)

      setCartItems(newCartItems)
   }

   //to toggle quantity
   const toggleCartItemQuantity = (id, value) => {
      foundProduct = cartItems.find((item) => item._id === id)

      index = cartItems.findIndex((product) => product._id === id)
      
      const newCartItems = cartItems.filter((item) => item._id !== id)

      if (value === 'inc') {
         // let newCartItems = [...cartItems, { ...product, quantity: product.quantity + 1 }]
         // setCartItems(newCartItems)
         

         setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
         
         setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)

         setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)

      } else if (value === 'dec') {

         if (foundProduct.quantity > 1) {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
         
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)

            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
         }  
      }
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
         totalPrice,
         qty,
         incQty,
         decQty,
         onAdd,
         onRemove,
         setShowCart,
         toggleCartItemQuantity,
         setTotalPrice,
         setTotalQuantities,
         setCartItems
      }}>
         {children}
      </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);