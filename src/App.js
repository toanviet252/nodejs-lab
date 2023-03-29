import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthComponent from "./pages/auth";
import SigninPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import jwt from "jwt-decode";
import { getToken } from "./utils/auth";
import { notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { loggedIn, setUserData, loggedOut, clearUserData } = useContext(AuthContext);

  useEffect(() => {
    const token = getToken();
    if (!token) return navigate("/auth/signin");
    const { exp } = jwt(token);
    if (exp * 1000 < Date.now()) {
      api.open({
        message: "Token Expried!",
        description: "You need to log in again.",
        icon: <FontAwesomeIcon icon={faCircleExclamation} />,
      });
      loggedOut();
      clearUserData();
      return navigate("/auth/signin");
    } else {
      const { fullName, isAdmin, phoneNumber, email } = jwtDecode(token);
      loggedIn();
      setUserData({ fullName, isAdmin, phoneNumber, email });
    }
  }, []);
  return (
    <>
      {contextHolder}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/auth/*" element={<AuthComponent />}>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
