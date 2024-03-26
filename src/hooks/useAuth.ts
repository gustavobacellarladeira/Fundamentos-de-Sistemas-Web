/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { auth } from "../Firebase";
import { setAuthDataRedux } from "../redux/auth/authSlice";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const authData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { authenticated, user, token } = useContext(AuthContext);

  const isAuthenticated = authenticated && loading === false;

  const setAuthData = (data: unknown) => {
    return dispatch(setAuthDataRedux(data));
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");

      // reload the page to clear the redux state
      window.location.reload();
    } catch (e) {
      console.log("error", e);
    }
  };

  const getUser = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        console.log("user", user);
      } else {
        console.log("no user");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return {
    authenticated: isAuthenticated,
    logout,
    signup,
    user,
    authData,
    getUser,
    setAuthData,
    token,
    loading,
    login,
  };
};
