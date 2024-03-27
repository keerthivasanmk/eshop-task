import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Home from './components/Home'
import CategoryDetails from './components/CategoryDetails'
import MenuItemDetails from './components/MenuItemDetails'
import CartItems from './components/CartItems'
import Orders from './components/Orders'

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category-details/:categoryName" element={<CategoryDetails />} />
          <Route path="/category-details/:categoryName/:menuItemId" element={ <MenuItemDetails/> } />
          <Route path="/cart" element={ <CartItems/> } />
          <Route path="/orders" element={ <Orders/> } />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;