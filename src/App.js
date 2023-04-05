import { useContext, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthComponent from "./pages/auth";
import SigninPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
// import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import jwt from "jwt-decode";
import { getToken } from "./utils/auth";
import { notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import { AuthContext } from "./contexts/AuthContext";
import BookingTransaction from "./pages/transaction/Transaction";
import { AdminPage } from "./pages/admin/Admin";
import LoadingFallback from "./components/Suspsen/SuspsenFallback";
import "./index.css";

const Home = lazy(() => import("./pages/home/Home"));

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
      const { fullName, isAdmin, phoneNumber, email, id } = jwtDecode(token);
      loggedIn();

      setUserData({ fullName, isAdmin, phoneNumber, email, id });
      if (isAdmin) return navigate("/admin/dashboard");
    }
  }, []);
  return (
    <>
      {contextHolder}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:hotelId" element={<Hotel />} />
          <Route path="/auth/*" element={<AuthComponent />}>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signin" element={<SigninPage />} />
          </Route>
          <Route path="/transactions" element={<BookingTransaction />} />
          {/* Admin  Routes*/}
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
