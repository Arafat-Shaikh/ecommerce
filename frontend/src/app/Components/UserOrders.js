import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrdersAsync, selectUserOrders } from "../Slices/userSlice";
import { useEffect } from "react";
import OrderList from "./OrderList";

export default function UserOrders() {
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  function handleDisplayColor(status) {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-100/60";
      case "Processing":
        return "text-emerald-500 bg-emerald-100/60";
      case "Shipped":
        return "text-blue-500 bg-blue-100/60";
      case "Delivered":
        return "text-purple-500 bg-purple-100/60";
      case "Refunded":
        return "text-gray-500 bg-gray-100/60";
      case "Cancelled":
        return "text-red-500 bg-red-100/60";
    }
  }

  useEffect(() => {
    dispatch(fetchUserOrdersAsync());
  }, [dispatch]);

  console.log(orders);
  return <OrderList orders={orders} handleDisplayColor={handleDisplayColor} />;
}
