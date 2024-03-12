import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import {
  increment,
  incrementAsync,
  selectCount,
} from "./counterSlice"

export default  function Counter () {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)


  return (
    <div>
      
    </div>
  )
}
