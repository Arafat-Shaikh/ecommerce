import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./input.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetailsAsync,
  selectUserDetails,
  updateUserAsync,
} from "../Slices/userSlice";

export default function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [visForm, setVisForm] = useState(false);
  const [addressIndex, setAddressIndex] = useState(null);
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    let copyDetails = { ...userDetails };

    if (addressIndex || addressIndex === 0) {
      copyDetails.addresses = [...copyDetails.addresses];
      copyDetails.addresses.splice(addressIndex, 1, data);
      console.log(copyDetails);
      setAddressIndex(null);
    } else {
      copyDetails = {
        ...copyDetails,
        addresses: [...copyDetails.addresses, data],
      };
    }

    dispatch(updateUserAsync(copyDetails));
    console.log(copyDetails);
    reset();
    setVisForm(false);
  };

  function deleteShippingDetails(index) {
    const copiedDetails = { ...userDetails };
    copiedDetails.addresses = [...userDetails.addresses];
    copiedDetails.addresses.splice(index, 1);
    console.log(copiedDetails);
    dispatch(updateUserAsync(copiedDetails));
  }

  function handleEditAddress(index) {
    setVisForm(true);
    setAddressIndex(index);
    setValue("name", userDetails.addresses[index].name);
    setValue("email", userDetails.addresses[index].email);
    setValue("street", userDetails.addresses[index].street);
    setValue("phone", userDetails.addresses[index].phone);
    setValue("pinCode", userDetails.addresses[index].pinCode);
    setValue("state", userDetails.addresses[index].state);
    setValue("city", userDetails.addresses[index].city);
  }

  useEffect(() => {
    dispatch(fetchUserDetailsAsync());
  }, [dispatch]);

  return (
    <>
      {userDetails && (
        <div className="lg:px-40 px-4 py-10 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-6 text-lg text-blue-900">
            {userDetails.email}
          </h3>
          <hr className=" m-5 bg-black"></hr>
          {!visForm && (
            <button
              onClick={() => setVisForm(true)}
              className="bg-gray-700 px-3 py-2 rounded-md text-white mb-6 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Add Address
            </button>
          )}
          {visForm && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  id="name"
                  {...register("name", { required: true, maxLength: 80 })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name.message}</p>
                )}
                <label
                  htmlFor="name"
                  className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  id="email"
                  {...register("email", { required: true, maxLength: 80 })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  id="street"
                  {...register("street", { required: true, maxLength: 80 })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="street"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Street
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    id="phone"
                    {...register("phone", { required: true, maxLength: 80 })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone number
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    id="pinCode"
                    {...register("pinCode", { required: true, maxLength: 80 })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="pinCode"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Pin-Code
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    id="state"
                    {...register("state", { required: true, maxLength: 80 })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="state"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    state
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    id="city"
                    {...register("city", { required: true, maxLength: 80 })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="city"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    City
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="mr-4 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setVisForm(false);
                  reset();
                }}
                type="button"
                className="mt-2 text-gray-900 bg-gray-300 hover:bg-gray-400  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 "
              >
                Cancel
              </button>
            </form>
          )}

          <ul>
            {userDetails &&
              userDetails.addresses.map((address, index) => (
                <div
                  key={index}
                  className="mt-5 relative bg-white shadow cursor-pointer rounded-xl"
                >
                  <div className="sm:flex-none md:flex lg:flex xl:flex  py-4 px-8">
                    <div className="flex-1 py-5 overflow-hidden">
                      <ul>
                        <li className="text-xs text-gray-600  ">User Info</li>
                        <li>{address.name}</li>
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
                          City: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {address.city}
                        </li>
                        <li>
                          Street: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {address.street}
                        </li>
                        <li>Pincode: &nbsp;&nbsp;{address.pinCode}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex-none pt-2.5 pr-2.5 pl-1 absolute top-0 right-0">
                    <button
                      type="button"
                      onClick={() => handleEditAddress(index)}
                      className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-blue-200 hover:fill-current hover:text-blue-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M5 18.08V19h.92l9.06-9.06-.92-.92z"
                          opacity=".3"
                        />
                        <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteShippingDetails(index)}
                      type="button"
                      className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M8 9h8v10H8z" opacity=".3" />
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
