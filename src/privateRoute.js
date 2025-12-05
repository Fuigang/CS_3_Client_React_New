// src/routes/PrivateRoute.jsx
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "store/useStore";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

export const ToLogin = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    alert("비정상적인 접근입니다.");
    logout();                  
    navigate("/login");  
  }, []);

  return null; // 화면 출력 없음
};