import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
     addCart(state, action){
        const newItem = action.payload;
        //to check if item is already available
        const existingItem = state.itemsList.find((item)=>item.id === newItem.id);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.totalPrice += newItem.price;
        } else {
            state.itemsList.push({
                id:newItem.id,
                price:newItem.price,
                quantity:1,
                totalPrice: newItem.price,
                name: newItem.name
            });

            state.totalQuantity++;
        }
     },
     removeCart(state, action){
         const id = action.payload;

         const existingItem = state.itemsList.find((item)=>item.id === id);
         if (existingItem.quantity === 1) {
            state.itemsList = state.itemsList.filter(item => item.id !== id);
            state.totalQuantity--;
         } else {
            existingItem.quantity--;
            existingItem.totalPrice -= existingItem.price;
         }
     },
     setShowCart(state){
       state.showCart = !state.showCart
     }
    }

   

});

export const sendCartData = (cart)=>{
    return async(dispatch) =>{
        dispatch(
            uiActions.showNotification({
                open: true,
                message:  "sending request",
                type: "warning"
            })
        );
    
    const sendRequest = async()=>{
        //send state as sending request 
        dispatch(uiActions.showNotification({
           open: true, 
          message: 'send request',
          type: 'warning'
        }))
       const res = await fetch('https://redux-http-c2664-default-rtdb.firebaseio.com/cartItems.json',
        {
         method:"PUT",
         body: JSON.stringify(cart),
        }
       );
    
       const data = await res.json();
    
       dispatch(uiActions.showNotification({
        open: true, 
        message: 'send request to data base successfully',
        type: 'success'
      }))
          
      };
      try {
        await sendRequest();
     } catch (error) {
       dispatch(uiActions.showNotification({
           open: true, 
           message: 'send request fail',
           type: 'error'
         }))
     }
    }
};

export  const cartActions = cartSlice.actions;

export default cartSlice;

