
import { ChevronDown,ChevronUp } from "../icons"
import { useDispatch } from "react-redux"
import { removeItem,toggleAmount,calculateTotal } from "../features/cart/cartSlice"
const CartItem = ({title,price,img,amount,id}) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt="" />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={()=>{
          dispatch(removeItem({id}))
        }}>remove</button>
      </div>
      <div>
        <button className="amount-btn"onClick={()=>{
          dispatch(toggleAmount({id:id,type:'increase'}))

        }}>
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={()=>{
          if(amount <= 1){
            dispatch(removeItem({id}))

          }
          dispatch(toggleAmount({id , type:'decrease'}))

        }}>
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}

export default CartItem
