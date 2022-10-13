import "./App.css";
import Header from "./components/header/HeaderComponent";
import AddUser from "./components/Add user/AddUserComponent";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users/UserComponent";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Users users={users} />} />
        <Route
          path="/add-user"
          element={<AddUser users={users} setUsers={setUsers} />}
        />
      </Routes>
    </div>
  );
}

export default App;
