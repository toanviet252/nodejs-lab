import React from "react";

const Users = (props) => {
  const listUsers = props.users.map((user) => {
    return <h2 key={user.id}>{user.name}</h2>;
  });
  return (
    <div>
      <h1>List of Users</h1>
      {listUsers?.length > 0 ? (
        <div>{listUsers}</div>
      ) : (
        <h3>Not found any Users</h3>
      )}
    </div>
  );
};
export default Users;
