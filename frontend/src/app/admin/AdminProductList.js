import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredProductsAsync,
  fetchProductFiltersAsync,
  selectProducts,
  selectProductsForFilter,
  selectTotalProducts,
} from "../Slices/productSlice";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../constants/Constants";
import { Link } from "react-router-dom";
import { fetchCartByUserAsync, selectCart } from "../Slices/CartSlice";
import { selectUserDetails } from "../Slices/userSlice";
import { selectUserToken } from "../Slices/authSlice";

const sortOptions = [
  { name: " Low to High", value: "asc", href: "#", current: false },
  { name: " High to Low", value: "desc", href: "#", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [],
  },
  {
    id: "brand",
    name: "Brand",
    options: [],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const fetchedProducts = useSelector(selectProducts);
  const totalProducts = useSelector(selectTotalProducts);
  const productsForFilter = useSelector(selectProductsForFilter);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState({});
  const [selectFilters, setSelectFilter] = useState({});
  const [searchValue, setSearchValue] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const pagesCount = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  // let products = searchedProducts.length ? searchedProducts : fetchedProducts;

  const products = useSelector(selectProductsForFilter);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25 " />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button
                                as="a"
                                href="#"
                                className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-3 text-sm text-gray-600 hover:text-gray-700"
                              >
                                <span className="font-medium text-gray-800">
                                  Button name
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <ChevronDownIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ChevronRightIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            {/* <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option}
                                  </label>
                                </div>
                              </div>
                            </Disclosure.Panel> */}
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6  ">
          <div className="flex-auto items-baseline justify-center  border-gray-200 pb-6">
            <div className="flex justify-end">
              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  {/* <Squares2X2Icon className="h-5 w-5" aria-hidden="true" /> */}
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 ">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                <Disclosure as="div" className="border-gray-200  py-6">
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                      >
                        <div className=" flex items-center hover:ml-8 transition-all duration-500 ml-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.3em"
                            viewBox="0 0 448 512"
                          >
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                          </svg>
                          <span className="ml-5 font-medium text-gray-800">
                            Users
                          </span>
                        </div>
                      </Disclosure.Button>
                    </h3>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                      >
                        <div className="flex items-center hover:ml-7 transition-all duration-500 ml-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                          >
                            <path d="M 5.75 3 A 1.0001 1.0001 0 0 0 4.8867188 3.4960938 L 3.1367188 6.4960938 A 1.0001 1.0001 0 0 0 3 7 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 7 A 1.0001 1.0001 0 0 0 20.863281 6.4960938 L 19.113281 3.4960938 A 1.0001 1.0001 0 0 0 18.25 3 L 5.75 3 z M 6.3242188 5 L 17.675781 5 L 18.841797 7 L 5.1582031 7 L 6.3242188 5 z M 5 9 L 19 9 L 19 19 L 5 19 L 5 9 z M 9 11 L 9 13 L 15 13 L 15 11 L 9 11 z"></path>
                          </svg>
                          <span className="font-medium text-gray-800  ml-4">
                            Products
                          </span>
                        </div>
                      </Disclosure.Button>
                    </h3>

                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                      >
                        <div className="ml-5 flex items-center hover:ml-8 transition-all duration-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.25em"
                            viewBox="0 0 576 512"
                          >
                            <path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM128 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32-128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224z" />
                          </svg>
                          <span className="font-medium text-gray-800 ml-5">
                            Orders
                          </span>
                        </div>
                      </Disclosure.Button>
                    </h3>
                  </>
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="max-w-3xl mx-auto">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="p-4">
                      <label htmlFor="table-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="table-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search for items"
                        />
                      </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="p-4">
                            {/* <div className="flex items-center">
                              <input
                                id="checkbox-all-search"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="checkbox-all-search"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div> */}
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Product name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Brand
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <button className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded-xl">
                              Add+
                            </button>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products &&
                          products.map((p) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="w-4 p-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <label
                                    htmlFor="checkbox-table-search-1"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                              >
                                {p.title}
                              </td>
                              <td className="px-6 py-4">{p.brand}</td>
                              <td className="px-6 py-4">{p.category}</td>
                              <td className="px-6 py-4">${p.price}</td>
                              <td className="px-6 py-4 text-right">
                                <a
                                  href="#"
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          ))}

                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
                  </div>

                  <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
