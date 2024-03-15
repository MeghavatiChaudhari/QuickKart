import "./App.css"
import Login from "./features/auth/components/Login"
import { Counter } from "./features/counter/Counter"
// import ProductList from "./features/product-list/ProductList"
import { Quotes } from "./features/quotes/Quotes"
import Home from './pages/HomePage'
import Signup from "./features/auth/components/Signup"
import Cart from "./features/cart/Cart"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import ProductDetail from './features/product-list/components/ProductDetail'
import ProductDetailPage from "./pages/ProductDetailPage"

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
  },
  {
    path: "/login",
    element:<Login></Login>,
  },
  {
    path: "/Signup",
    element:<Signup></Signup>,
  },
  {
    path:"/cart",
    element:<CartPage></CartPage>
  },
  {
    path:"/cart/checkout",
    element:<CheckoutPage></CheckoutPage>
  },
  {
    path:"/product-detail",
    element:<ProductDetailPage></ProductDetailPage>
  }
]);
const App = () => {
  return (
    <div className="App">
       <RouterProvider router={router} />
      {/* <Home/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
    </div>
  )
}

export default App
