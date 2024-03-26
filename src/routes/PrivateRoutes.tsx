import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  children: JSX.Element;
}

export const PrivateRoutes: React.FC<PrivateRoutesProps> = (props) => {
  const { children } = props;
  const { authenticated } = useAuth();

  return authenticated ? children : <Navigate to="/login" />;
};
