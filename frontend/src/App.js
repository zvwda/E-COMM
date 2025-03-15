import './App.css';
import Nav_bar from './Components/Nav-bar/Nav-bar';
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Shop from './pages/shop';
import ShopCategory from './pages/shopCategory';  
import Product from './pages/Product'; 
import Cart from './pages/Cart';  
import LoginSignUp from './pages/LoginSignup';
import Fotter from './Components/Footer/Fotter';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'




function App() {
  return (
    <div>
      <BrowserRouter>      
        <Nav_bar/>
        <Routes> 
        <Route path='/' element={<Shop />} />

        <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>}></Route>

        <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}></Route>

        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid"/>}></Route>

        <Route path='/product' element={<Product/>}>        
        <Route path=':productId' element={<Product/>}/>
        </Route>

        <Route path='/cart' element={<Cart> </Cart>}></Route>
        <Route path='/login' element={<LoginSignUp/>}></Route>
         
        </Routes>
        <Fotter></Fotter>
      </BrowserRouter>

    </div>
  );
}

export default App;
