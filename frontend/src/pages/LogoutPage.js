import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "../app/Slices/authSlice";
import { Navigate } from "react-router-dom";

export default function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUserAsync());
    <Navigate to={"/login"} replace={true}></Navigate>;
  }, [dispatch]);
  return;
}
