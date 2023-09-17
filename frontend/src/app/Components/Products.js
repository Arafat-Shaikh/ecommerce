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
  { name: "Top Rating", value: "rating", href: "#", current: false },
  { name: "Price: Low to High", value: "asc", href: "#", current: false },
  { name: "Price: High to Low", value: "desc", href: "#", current: false },
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

export default function Product() {
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
  let products = searchedProducts.length ? searchedProducts : fetchedProducts;

  if (productsForFilter) {
    for (let product of productsForFilter) {
      if (!filters[0].options.includes(product.category)) {
        filters[0].options.push(product.category);
      }
      if (!filters[1].options.includes(product.brand)) {
        filters[1].options.push(product.brand);
      }
    }
    console.log(filters);
  }

  //if searchValue has words then show searched Products if searchValue has no words then show filterfetched products.

  function handleSearchChange(e) {
    if (e.target.value) {
      setSearchValue(e.target.value);
    } else {
      setSearchedProducts([]);
    }
  }

  function handleProductSearch() {
    console.log(searchedProducts);
    const copiedProducts = [...productsForFilter];
    let temp = [];
    for (let product of copiedProducts) {
      if (
        product.title.toLowerCase().trim().includes(searchValue) ||
        product.category.toLowerCase().trim().includes(searchValue) ||
        product.brand.toLowerCase().trim().includes(searchValue)
      ) {
        console.log("hello");
        temp.push(product);
      }
    }
    setSearchedProducts(temp);
  }

  function handleQuery(e, option, sectionName) {
    if (page > 1) {
      setPage(1);
    }
    let smSectionName = sectionName.toLowerCase();
    let testFilter = { ...selectFilters };
    if (e.target.checked) {
      setSearchedProducts([]);
      // testFilter = { ...selectFilters, [smSectionName]: option };
      if (testFilter[smSectionName]) {
        console.log(option);
        testFilter[smSectionName].push(option);
      } else {
        testFilter[smSectionName] = [option];
      }
      // setSelectFilter(testFilter);
    } else {
      // delete testFilter[smSectionName];
      const index = testFilter[smSectionName].indexOf(option);
      console.log(index);
      testFilter[smSectionName].splice(index, 1);
    }
    console.log(testFilter);
    setSelectFilter(testFilter);
  }

  function handleSort(value) {
    console.log(value);
    setSorting({ sort: "price", order: value });
  }

  function handlePage(index) {
    console.log(index);
    setPage(index);
  }

  console.log(products);

  useEffect(() => {
    let pagination = { page: page, perPage: ITEMS_PER_PAGE };
    console.log(pagination);
    dispatch(
      fetchFilteredProductsAsync({ pagination, sorting, selectFilters })
    );
    dispatch(fetchProductFiltersAsync());
  }, [dispatch, page, sorting, selectFilters]);

  return (
    <>
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
                                    {section.name}
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
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={optionIdx}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option}
                                        type="checkbox"
                                        onChange={(e) =>
                                          handleQuery(e, option, section.name)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
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

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="flex-auto items-baseline justify-center  border-gray-200 pb-6">
              <div className="mb-3 flex  sm:justify-center md:justify-center justify-center">
                {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 hidden md:block">
                  Ecommerce
                </h1> */}

                <div className="relative mb-4 w-2/3 flex items-stretch">
                  <input
                    type="search"
                    className="relative m-0 -mr-0.5 block w-full md:w-[60%] lg:w-[40%] min-w-0 flex-auto rounded-l border border-solid border-neutral-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon3"
                    onChange={(e) => handleSearchChange(e)}
                  />
                  {/* Search button */}
                  <button
                    className="relative z-[2] rounded-r border-2 border-neutral-500 px-3 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-neutral-600 hover:bg-black-5 hover:text-white focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3"
                    data-te-ripple-init=""
                    onClick={() => handleProductSearch()}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  onClick={() => handleSort(option.value)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

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

            <section aria-labelledby="products-heading" className="pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-gray-200  py-6"
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
                                {section.name}
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
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={optionIdx}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option}
                                    type="checkbox"
                                    onChange={(e) =>
                                      handleQuery(e, option, section.name)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Your content */}
                  {products && (
                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                          {products.map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/detail/${product.id}`}
                              className="group transform h-50  w-50 transition duration-500 hover:scale-110 rounded-lg px-2 py-2 hover:shadow-xl shadow-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="mt-1 text-sm font-medium text-gray-900">
                                    {product.title}
                                  </p>

                                  <h3 className="mt-4 text-sm text-gray-700 flex items-center ">
                                    <svg
                                      className="w-4 h-4 text-yellow-300 mr-1"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 22 20"
                                    >
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>{" "}
                                    {product.rating}
                                  </h3>
                                </div>
                                <div>
                                  <p className="mt-1 text-lg font-medium text-gray-900">
                                    $
                                    {parseInt(
                                      product.price -
                                        product.price *
                                          (product.discountPercentage / 100)
                                    )}
                                  </p>
                                  <h3 className="mt-4 text-sm text-gray-700 line-through">
                                    ${product.price}
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <nav aria-label="Page navigation example">
              <ul className="list-style-none flex float-right mb-20">
                <li onClick={() => handlePage(page > 1 ? page - 1 : page)}>
                  <a
                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                    href="#!"
                  >
                    Previous
                  </a>
                </li>

                {totalProducts &&
                  Array.from({ length: pagesCount }).map((page, index) => (
                    <li key={index} onClick={() => handlePage(index + 1)}>
                      <a
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        href="#!"
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                <li
                  onClick={() =>
                    handlePage(page < pagesCount ? page + 1 : page)
                  }
                >
                  <a
                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                    href="#!"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </main>
        </div>
      </div>
    </>
  );
}
