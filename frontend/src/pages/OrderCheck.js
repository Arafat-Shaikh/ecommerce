import { useLocation } from "react-router-dom";
import OrderList from "../app/Components/OrderList";
import { StatusContext, useColor } from "../app/Context/UseColor";

export default function OrderCheck() {
  const location = useLocation();
  const { state } = location;
  const userOrders = JSON.parse(state.userOrders);
  const handleDisplayColor = useColor(StatusContext);

  return (
    <OrderList orders={userOrders} handleDisplayColor={handleDisplayColor} />
  );
}
