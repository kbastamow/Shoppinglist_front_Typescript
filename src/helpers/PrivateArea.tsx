import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateAreaProps = {
  children: ReactNode;
};

const PrivateArea = ({ children }: PrivateAreaProps) => {
  const hasToken = localStorage.getItem("token-shoppinglist");
  return hasToken ? children : <Navigate to="/login" />;
};

export default PrivateArea;
