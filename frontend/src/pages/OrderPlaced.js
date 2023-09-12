import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  resetReceivedOrderId,
  selectReceivedOrder,
} from "../app/Slices/orderSlice";
import { useState } from "react";

export default function OrderPlaced() {
  const orderId = useSelector(selectReceivedOrder);
  const dispatch = useDispatch();

  return (
    <>
      {!orderId && <Navigate to="/" replace={true}></Navigate>}
      {orderId ? (
        <div className=" px-4 py-6 rounded-lg ">
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 lg:w-1/2 mx-auto md:w-3/4 ">
              <div className="flex mb-2 justify-center items-center rounded-full px-2 py-2">
                <p className="ml-2 lg:text-lg md:text-lg text-xs  px-2 py-0 ">
                  #{orderId}
                </p>
              </div>
              <div className=" mb-2  rounded-xl  py-4">
                <div className="flex justify-center">
                  <h1 className=" lg:text-xl md:text-2xl text-xs  ">
                    Order Received Successfully
                  </h1>
                </div>
                <div className="flex justify-center">
                  <p className="font-semibold px-4 py-2 mt-10 mb-2">
                    Track Your Order
                  </p>
                </div>
                <div className="flex justify-center">
                  <Link
                    to="/user/orders"
                    onClick={() => dispatch(resetReceivedOrderId())}
                    className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-2 mb-6"
                  >
                    Check Orders
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex items-center justify-center">
                <p>Thank You for Shopping With Us!</p>
              </div>
            </div>
          </>
        </div>
      ) : (
        <div className="text-yellow-500">No Orders</div>
      )}
    </>
  );
}
