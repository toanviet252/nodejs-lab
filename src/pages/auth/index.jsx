import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const AuthComponent = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default AuthComponent;
