import CartContainer from "./component/CartContainer";
import { useDispatch, useSelector } from "react-redux"
import { getCartItems } from "./features/cart/cartSlice";
import Navbar from "./component/Navbar";
import Modal from "./component/Modal";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch()
  const {isOpen} = useSelector((store)=>store.modal);
  const {isLoading} = useSelector((store)=>store.cart);
  useEffect(()=>{
    dispatch(getCartItems('hello world'))
  },[])
  if(isLoading){
    return <div className="loading">
      <h1>loading...</h1>
    </div>
  }
  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>
}
export default App;
