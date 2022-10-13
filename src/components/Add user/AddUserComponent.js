import React from "react";
import "./adduser.css";
import axios from "axios";

const AddUser = (props) => {
  const onSubmitForm = (e) => {
    const newUser = {
      name: e.target.user.value,
    };
    e.preventDefault();
    console.log(e.target.user.value);
    axios
      .post("http://localhost:5000/add-user", newUser)
      .catch((err) => console.log(err));
    props.setUsers((pre) => [...pre, newUser]);
  };
  return (
    <div className="Form-user-container">
      <form
        className="form-control"
        onSubmit={(values) => onSubmitForm(values)}
        action="/add-user"
        method="POST"
      >
        <input className="input-user" id="user" />
        <button type="submit" className="btn-add-user">
          Add user
        </button>
      </form>
    </div>
  );
};
export default AddUser;
