import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemApiAsync,
  selectCart,
  updateCartItemAsync,
} from "../Slices/CartSlice";
import { Link, Navigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalPrice = cart.reduce(
    (acc, item) => item.discountPrice * item.quantity + acc,
    0
  );
  function handleQuantity(item, value) {
    const newItem = { id: item.id, quantity: value };
    dispatch(updateCartItemAsync(newItem));
  }

  function handleDeleteCartItem(itemId) {
    dispatch(deleteItemApiAsync(itemId));
  }

  return (
    <>
      {!cart.length ? (
        <Navigate to="/" replace={true}></Navigate>
      ) : (
        <div>
          <style>
            {`
        @layer utilities {
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      `}
          </style>

          <div className="h-screen bg-white pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {/* Cart Item 1 */}
                {cart.map((item) => (
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-sm">Product</th>
                          <th className="text-left text-sm">Price</th>
                          <th className="text-left text-sm">Quantity</th>
                          <th className="text-left text-sm">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-4 w-1/4">
                            <div className="flex items-center mb-2 ">
                              <img
                                className="h-12 w-12 mr-4"
                                src={item.product.thumbnail}
                                alt="Product image"
                              />
                            </div>{" "}
                            <span className=" text-sm ">
                              {item.product.title}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="text-center w-8">
                              ${item.discountPrice}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  handleQuantity(
                                    item,
                                    item.quantity > 1
                                      ? item.quantity - 1
                                      : item.quantity
                                  )
                                }
                                className="border rounded-md py-0 px-2 mr-2"
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantity(
                                    item,
                                    item.quantity < 4
                                      ? item.quantity + 1
                                      : item.quantity
                                  )
                                }
                                className="border rounded-md py-0 px-2 ml-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            ${item.quantity * item.discountPrice}
                          </td>
                        </tr>

                        {/* More product rows */}
                      </tbody>
                    </table>
                    <div className="flex justify-end space-x-4 px-6 text-red-500">
                      <p
                        onClick={() => handleDeleteCartItem(item.id)}
                        className="text-sm cursor-pointer"
                      >
                        remove
                      </p>
                    </div>
                  </div>
                ))}

                {/* Cart Item 2 */}
              </div>

              {/* Sub total */}
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">${totalPrice}</p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">$4.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Total Items</p>
                  <p className="text-gray-700">{cart.length}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div>
                    <p className="mb-1 text-lg font-bold">
                      ${totalPrice + 4.99}
                    </p>
                  </div>
                </div>

                <Link to={"/checkout"}>
                  <button className="mt-6 w-full rounded-md bg-yellow-600 py-1.5 font-medium text-black hover:bg-yellow-500">
                    Check out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
