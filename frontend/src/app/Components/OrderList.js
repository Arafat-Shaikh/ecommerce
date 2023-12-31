export default function OrderList({ orders, handleDisplayColor }) {
  return (
    <div className="bg-gray-200 px-4 py-6 rounded-lg ">
      {orders &&
        orders.map((order) => (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 lg:w-1/2 mx-auto md:w-3/4 ">
              <div className="flex mb-2">
                <h1 className=" lg:text-xl md:text-2xl text-xs uppercase ">
                  Order Id:{" "}
                </h1>
                <p className="ml-2 lg:text-lg md:text-lg text-xs rounded-full px-2 py-0 text-amber-800 bg-yellow-100 ">
                  #{order.id}
                </p>
              </div>
              <div className="flex items-center  mb-5">
                <h1 className=" lg:text-md md:text-sm text-xs uppercase ">
                  Date:{" "}
                </h1>
                <p className="lg:text-xs md:text-xs text-xs rounded-full px-2 py-1  ml-2">
                  {order.createdAt}
                </p>
              </div>
              <div className="flex items-center  mb-5">
                <h1 className=" lg:text-md md:text-sm text-xs uppercase ">
                  Status:{" "}
                </h1>
                <p
                  className={`lg:text-sm md:text-sm text-sm font-semibold rounded-full px-2 py-1 ml-2 ${handleDisplayColor(
                    order.OrderStatus
                  )}`}
                >
                  {order.OrderStatus}
                </p>
              </div>
              <hr className="mb-2"></hr>

              <div className="flex justify-between">
                <p className="w-1/3 text-green-600">Item</p>
                <p className="w-1/4">Price</p>
                <p className="w-1/4">Qty</p>
                <p className="w-1/4">Amount</p>
              </div>

              {order.items.map((item) => (
                <>
                  <div className="flex justify-between items-center">
                    <div className="mt-4 w-1/3 ">
                      <img
                        className="h-12 w-12 mr-4 rounded-md "
                        src={item.product.thumbnail}
                        alt="Product image"
                      />
                      <p className="text-sm mt-3">{item.product.title}</p>
                      <p className="text-xs mt-1 text-amber-600">
                        {item.product.brand}
                      </p>
                    </div>

                    <p className="w-1/4 text-gray-500">
                      ${item.discountPrice}.99
                    </p>
                    <p className="w-1/4 text-gray-500 px-2 py-2 rounded-xl border-lime-700">
                      {item.quantity}
                    </p>
                    <p className="w-1/4 text-gray-500">
                      ${item.quantity * item.discountPrice}
                    </p>
                  </div>
                </>
              ))}
              <hr className="m-4"></hr>
              <div>
                <div className="flex justify-evenly">
                  <p className="text-md font-semibold">
                    &nbsp;&nbsp;Sub total:
                  </p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-evenly">
                  <p className="text-md font-semibold">Total Items:</p>
                  <p>{order.items.length}</p>
                </div>
              </div>
              <hr className="m-4"></hr>
              <div className="mt-4">
                <p className="flex">
                  <svg
                    className=" h-6 w-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
                  </svg>
                  Shipping Address
                </p>
                <p className="text-md text-gray-500">
                  {order.address.pinCode}, {order.address.state} /
                  {order.address.city}, {order.address.street},
                </p>{" "}
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.2"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm ml-2">
                    {order.address.phone}
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
