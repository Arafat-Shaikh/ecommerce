import { useDispatch, useSelector } from "react-redux";
import {
  adminUpdateUserAsync,
  adminDeleteUserAsync,
  fetchAllUsersAsync,
  selectAllUser,
} from "../Slices/userSlice";
import { useEffect, useState } from "react";
import { selectAllOrders } from "../Slices/orderSlice";

export default function Users() {
  const dispatch = useDispatch();
  const fetchedUsers = useSelector(selectAllUser);
  const orders = useSelector(selectAllOrders);
  const [users, setUsers] = useState();
  const [filter, setFilter] = useState("all");

  function handleUserRoleChange(e, index) {
    const copiedUsers = [...users];
    let singleUser = { ...copiedUsers[index] };
    singleUser.role = e.target.value;
    dispatch(adminUpdateUserAsync(singleUser));
  }

  function handleUserDelete(userEmail) {
    const deleteUser = users.find((user) => user.email === userEmail);
    dispatch(adminDeleteUserAsync(deleteUser));
  }

  function handleUserOrder(userId) {
    const order = orders.filter((order) => order.user === userId);
    const orderCount = order ? order.length : "";
    return orderCount;
  }

  function showCustomers(value) {
    if (value === "customers") {
      const uniqueUsers = new Set(orders.map((order) => order.user));
      return uniqueUsers.size;
    } else {
      const userCount = fetchedUsers.length;
      return userCount;
    }
  }

  useEffect(() => {
    if (filter === "all") {
      setUsers(fetchedUsers);
    } else if (filter === "customers") {
      // get all the users id's from the orders.
      // then get all the userDetails who's id's you got.
      // let customerTypeUser = [];
      // const uniqueUsers = new Set(orders.map((order) => order.user));
      // console.log(uniqueUsers);
    }
  }, [filter]);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);
  return (
    <section className="container px-4 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Customers
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {showCustomers("customers")}
          </span>
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Total Visitors
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {showCustomers("user")}
          </span>
        </div>
      </div>
      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <button
            onClick={(e) => setFilter("all")}
            className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 ${
              filter === "all" && "bg-gray-100"
            } sm:text-sm dark:bg-gray-800 dark:text-gray-300`}
          >
            View all
          </button>
          <button
            onClick={() => setFilter("customers")}
            className={`${
              filter === "customers" && "bg-gray-100"
            } px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100`}
          >
            Customers
          </button>
          <button
            onClick={() => setFilter("visitors")}
            className={` ${
              filter === "customers" && "bg-gray-100"
            } px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100`}
          >
            Visitors
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button className="flex items-center gap-x-3 focus:outline-none">
                        <span>Email</span>
                        <svg
                          className="h-3"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.3"
                          />
                        </svg>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Orders
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    ></th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {users &&
                    users.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">
                              {user.email}
                            </h2>
                            {/* <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                catalogapp.io
                              </p> */}
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div
                            className={`inline px-3 py-1 text-sm font-normal rounded-full  dark:bg-gray-800 ${
                              user.role === "user"
                                ? "text-emerald-500 gap-x-2 bg-emerald-100/60"
                                : "text-yellow-500 gap-x-2 bg-yellow-100/60"
                            }`}
                          >
                            <select
                              onChange={(e) => handleUserRoleChange(e, index)}
                              className="bg-transparent outline-none text-black"
                              defaultValue={user.role}
                            >
                              <option value={"user"}>user</option>
                              <option value={"admin"}>admin</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            {user.addresses[0] ? (
                              <>
                                <h4 className="text-gray-700 dark:text-gray-200">
                                  {user.addresses[0].state} /
                                  {user.addresses[0].city},{" "}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">
                                  {user.addresses[0].pinCode},{" "}
                                  {user.addresses[0].street},
                                </p>
                              </>
                            ) : (
                              <p className="text-gray-500 dark:text-gray-400">
                                Not Added
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center justify-center border-solid border-2 rounded-lg">
                            <div
                              onClick={() => showCustomers()}
                              className=" w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 22 22"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                            <span className="font-semibold ">
                              {handleUserOrder(user.id)}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div
                            onClick={() => handleUserDelete(user.email)}
                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}