import './navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Space } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = pathname.split('/')[2];
  const { isAuth, userData } = useContext(AuthContext);
  console.log(isAuth, userData);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Space className="logo">
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => navigate('/')}
            style={{
              cursor: 'pointer',
            }}
          />
          Booking Website
        </Space>
        {!isAuth ? (
          <>
            <div className="navItems">
              <button
                className={`navButton ${location === 'signup' ? 'active' : ''}`}
                onClick={() => navigate('/auth/signup')}
              >
                Register
              </button>
              <button
                className={`navButton ${location === 'signin' ? 'active' : ''}`}
                onClick={() => navigate('/auth/signin')}
              >
                Login
              </button>
            </div>
          </>
        ) : (
          <div className="user-holder">
            <span>{userData.fullName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
