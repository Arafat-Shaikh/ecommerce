import { useSelector } from "react-redux";
import { selectUserToken } from "../Slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminAuth({ children }) {
  const userToken = useSelector(selectUserToken);
  const navigate = useNavigate();
  if (userToken.role === "admin") {
    return children;
  } else {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
}
