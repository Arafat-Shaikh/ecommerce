import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemApiAsync,
  emptyCartAsync,
  selectCart,
  updateCartItemAsync,
} from "../app/Slices/CartSlice";
import Cart from "../app/Components/Cart";
import { useEffect, useState } from "react";
import {
  fetchUserDetailsAsync,
  selectUserDetails,
  updateUserAsync,
} from "../app/Slices/userSlice";
import { createOrderApiAsync } from "../app/Slices/orderSlice";

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [newDetails, setNewDetails] = useState(false);
  const [orderAddress, setAddress] = useState(null);
  const [payment, setPayment] = useState("");
  const totalPrice = cart.reduce(
    (acc, item) => item.discountPrice * item.quantity + acc,
    0
  );
  const userDetails = useSelector(selectUserDetails);
  function handleQuantity(item, value) {
    const newItem = { id: item.id, quantity: value };
    dispatch(updateCartItemAsync(newItem));
  }

  const onSubmit = (data) => {
    console.log(data);
    const copyUser = { ...userDetails };
    const updatedUser = {
      ...copyUser,
      addresses: [...copyUser.addresses, data],
    };
    console.log(updatedUser);
    dispatch(updateUserAsync(updatedUser));
    setNewDetails(false);
    reset();
  };

  function handleProcess() {
    if (payment && orderAddress) {
      const cartCopy = [...cart];
      const cartItems = cartCopy.map(({ user, ...rest }) => rest);
      const orderDetails = {
        items: cartItems,
        totalAmount: totalPrice,
        totalItems: cartItems.length,
        user: userDetails.id,
        paymentType: payment,
        orderStatus: "Pending",
        address: orderAddress,
      };
      console.log(orderDetails);
      dispatch(createOrderApiAsync(orderDetails));
      dispatch(emptyCartAsync());
    } else {
      alert("Select Details");
    }
  }

  function handleDeleteCartItem(itemId) {
    dispatch(deleteItemApiAsync(itemId));
  }

  function handleAddress(index) {
    const selectedAddress = userDetails.addresses[index];
    setAddress(selectedAddress);
  }

  useEffect(() => {
    dispatch(fetchUserDetailsAsync());
  }, [dispatch]);

  return (
    <>
      {!cart.length && (
        <Navigate to={"/order/placed"} replace={true}></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* This form is for address */}
            {!newDetails && (
              <button
                onClick={() => setNewDetails(true)}
                type="button"
                className="mb-5 mt-10 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Add New Details
              </button>
            )}
            {newDetails && (
              <div>
                <form
                  className="bg-white px-5 py-12 mt-12"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Shipping Details
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is required",
                              })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                              })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone is required",
                              })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street is required",
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.street && (
                              <p className="text-red-500">
                                {errors.street.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state is required",
                              })}
                              id="state"
                              autoComplete="address-level1"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.state && (
                              <p className="text-red-500">
                                {errors.state.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "pinCode is required",
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.pinCode && (
                              <p className="text-red-500">
                                {errors.pinCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        // onClick={e=>reset()}
                        type="text"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => reset()}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            <div className="border-b border-gray-900/10 pb-12 ">
              <ul>
                {userDetails &&
                  userDetails.addresses.map((address, index) => (
                    <div className="mt-5 bg-white shadow cursor-pointer rounded-xl">
                      <div className="flex ">
                        <div className="flex-1 py-5 pl-5 overflow-hidden  ">
                          <ul>
                            <li className=" italic font-semibold">
                              {address.email}
                            </li>
                            <li>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                  />
                                </svg>

                                <p className="ml-1 italic text-sm">
                                  - {address.phone}
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="flex-1 py-5 pl-1 overflow-hidden ">
                          <ul>
                            <li className="text-xs text-gray-600 uppercase">
                              Address Details
                            </li>
                            <li>
                              State: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {address.state}
                            </li>
                            <li>
                              City:
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {address.city}
                            </li>
                            <li>
                              Street: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {address.street}
                            </li>
                            <li>Pincode: &nbsp;&nbsp;{address.pinCode}</li>
                          </ul>
                        </div>
                        <div className="flex-none pt-2.5 pr-2.5 pl-1">
                          <input
                            onChange={() => handleAddress(index)}
                            name="address"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </ul>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>

                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        value="cash"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => setPayment("cash")}
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        name="payments"
                        value="card"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => setPayment("credit")}
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4">
              <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
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
                </div>
              </div>

              <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalPrice} </p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p> {cart.length}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link to={`/order/placed}`}></Link>
                  <div className="w-full flex justify-center">
                    <div
                      onClick={() => handleProcess()}
                      className={`cursor-pointer mt-10 flex w-3/5 items-center justify-center rounded-full border border-transparent px-6 py-2 text-base font-semibold text-black focus:outline-none focus:ring-2 focus:ring-offset-2 
                       bg-yellow-500 hover:bg-yellow-600 
                      focus:ring-yellow-500 
                     `}
                    >
                      Order Now
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-gray-600 hover:text-gray-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
