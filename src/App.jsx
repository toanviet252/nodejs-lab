import './App.css';
import './css/custom.css';
import './css/style.default.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './Share/Footer/Footer';
import Header from './Share/Header/Header';
import Home from './Home/Home';
import Detail from './Detail/Detail';
import Cart from './Cart/Cart';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Checkout from './Checkout/Checkout';
import History from './History/History';
import Shop from './Shop/Shop';
import Chat from './Share/Chat/Chat';
// import ErrorBoundary from './templates/ErrorBoundary';

function App() {
  return (
    <div className="App">
      {/* <ErrorBoundary> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />{' '}
          <Route path="/detail/:id" element={<Detail />} />{' '}
          <Route path="/cart" element={<Cart />} />{' '}
          <Route path="/signin" element={<SignIn />} />{' '}
          <Route path="/signup" element={<SignUp />} />{' '}
          <Route path="/checkout" element={<Checkout />} />{' '}
          <Route path="/history/*" element={<History />} />{' '}
          <Route path="/shop" element={<Shop />} />
        </Routes>{' '}
        <Chat />
        <Footer />
      </BrowserRouter>
      {/* </ErrorBoundary> */}
    </div>
  );
}

export default App;
