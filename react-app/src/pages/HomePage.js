import Navbar from '../features/navbar/Navbar';
import ProductList from '../features/product/components/ProductList';
import ProductDetail from '../features/product/components/ProductDetail';
export default function Home(){
    return(
 <Navbar>
    <ProductList></ProductList>
    {/* <ProductDetail></ProductDetail> */}
 </Navbar>
    )
}