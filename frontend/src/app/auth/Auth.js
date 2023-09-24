import { useSelector } from "react-redux";
import { selectUserToken } from "../Slices/authSlice";
import { Navigate } from "react-router-dom";

export default function Auth({ children }) {
  const userAuth = useSelector(selectUserToken);
  if (userAuth) {
    return children;
  } else {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
}
