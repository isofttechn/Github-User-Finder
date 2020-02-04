import React, { useContext } from "react";

import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

import UserItems from "./UserItems";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItems key={user.id} user={user} />
        ))}
      </div>
    );
  }
}; 

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;
