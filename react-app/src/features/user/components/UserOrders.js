import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import {
  fetchLoggedInUserOrderAsync,
  selectUserOrders
} from "../UserSlice"
//  import { selectLoggedInUser } from "../../auth/authSlice"
import { selectLoggedInUser } from "../../auth/authSlice"


export default  function UserOrders () {
  const dispatch = useDispatch()
  const user= useSelector(selectLoggedInUser);
  const orders=useSelector(selectUserOrders);

  console.log(user)
  useEffect(()=>{
    dispatch(fetchLoggedInUserOrderAsync(user.id))
  },[dispatch,user])


  return (
    <div>
             {orders.map((order)=>{
                <div>{order.id}</div>
             })}
       
    </div>
  )
}
