import { useEffect } from "react";
import "./App.css";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from 'react-redux';
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
import { sendCartData } from "./store/cart-slice";


let isFirstRender = true;

function App() {
  
  const dispatch = useDispatch();
  const notification = useSelector(state=>state.ui.notification)

  const cart = useSelector((state)=>state.cart)
 console.log(cart);
const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);


useEffect(()=>{
  if (isFirstRender) {
    isFirstRender = false;
    return;
  }
  
   dispatch( sendCartData(cart));
 
},[cart,dispatch]);

  return (
    <div className="App">
   {notification &&  <Notification type={notification.type} message= {notification.message} />}
      {!isLoggedIn && <Auth /> }
      {isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
