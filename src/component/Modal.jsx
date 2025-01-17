import { closeModal } from "../features/modal/modal"
import { useDispatch } from "react-redux"
import { clearCart } from "../features/cart/cartSlice";
const Modal = () => {
  const dispatch = useDispatch();
  return <aside className="modal-container">
    <div className="modal">
      <h4>remove all items from the cart</h4>
      <div className="btn-container">
        <button className="btn confirm-btn"onClick={()=>{
          dispatch(clearCart())
          dispatch(closeModal());
        }}>
          confirm
        </button>
        <button className="btn clear-btn" onClick={()=>{
          dispatch(closeModal());
        }}>
          cancel
        </button>
      </div>
    </div>
  </aside>
}

export default Modal
