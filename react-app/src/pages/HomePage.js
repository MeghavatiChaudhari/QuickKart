import Navbar from '../features/navbar/Navbar';
import ProductList from '../features/product-list/components/ProductList';
import ProductDetail from '../features/product-list/components/ProductDetail';
export default function Home(){
    return(
 <Navbar>
    <ProductList></ProductList>
    {/* <ProductDetail></ProductDetail> */}
 </Navbar>
    )
}