import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, selectUserToken } from "../app/Slices/authSlice";
import { Navigate } from "react-router-dom";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  useEffect(() => {
    if (userToken) {
      dispatch(logoutUserAsync());
    }
  }, [dispatch, userToken]);
  return (
    <>{!userToken && <Navigate to={"/login"} replace={true}></Navigate>}</>
  );
}
