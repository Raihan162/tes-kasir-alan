import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Cart from './components/cart';
import Navbar from './components/navbar';
import Menu from './components/menu';
import AddMenu from './components/addMenu';

function App() {

  const [allMenu, setAllMenu] = useState([])
  const [dataCart, setDataCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  let getData = async () => {
    try {
      let response = await axios.get('http://localhost:5000/food/allFood')
      setAllMenu(response.data.data)
    } catch (error) {
    }
  }

  let getDataCart = async () => {
    try {
      let response = await axios.get('http://localhost:5000/cart/dataCart')
      setDataCart(response.data.data)

      let priceCart = 0
      response.data.data.forEach((value) => {
        priceCart += value.qty * value.food.price
      })
      setTotalPrice(priceCart)
    } catch (error) {

    }
  }

  useEffect(() => {
    getData()
    getDataCart()
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='cart' element={<Cart func={{ getDataCart }} data={{ allMenu, dataCart, totalPrice }} />} />
          <Route path='menu' element={<Menu func={{ getData }} data={{ allMenu }} />} />
          <Route path='addMenu' element={<AddMenu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
