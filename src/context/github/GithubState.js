/* eslint-disable jsx-a11y/alt-text */

import React, { useReducer } from "react";

import axios from "axios";

import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING
} from "../types";

import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

let githubClientId;
let githubClientSecret;

//CHECKING THE ENVIRONMENT
if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=$
      {githubClientId}&client_secret=$
      {githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  //Get Single Github User
  const getUser = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=$
      {githubClientId}&client_secret=$
      {githubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  //Get Users Repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=12&sort=created:asc&client_id=$
      {githubClientId}&client_secret=$
      {githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  //Clear Users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
