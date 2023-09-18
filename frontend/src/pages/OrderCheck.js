import { useLocation } from "react-router-dom";
import OrderList from "../app/Components/OrderList";

export default function OrderCheck() {
  const location = useLocation();
  const { state } = location;
  const userOrders = JSON.parse(state.userOrders);
  function handleDisplayColor() {}

  console.log(state);
  return (
    <OrderList orders={userOrders} handleDisplayColor={handleDisplayColor} />
  );
}
