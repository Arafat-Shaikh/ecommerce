import { useDispatch, useSelector } from "react-redux";
import {
  createProductApiAsync,
  fetchProductByIdAsync,
  fetchProductFiltersAsync,
  selectProductById,
  selectProducts,
  selectProductsForFilter,
  selectTotalProducts,
  updateProductApiAsync,
} from "../../Slices/productSlice";
import { useEffect } from "react";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { useRef, useState } from "react";

import { ITEMS_PER_PAGE } from "../../constants/Constants";

import Users from "./AdminUsersList";

import Orders from "./AdminOrderList";
import { Controller, useForm } from "react-hook-form";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Form } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const adminComponent = {
    products: "products",
    orders: "orders",
    users: "users",
  };
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [showComponent, setShowComponent] = useState(adminComponent.products);

  // let products = searchedProducts.length ? searchedProducts : fetchedProducts;
  function handleAdminComponent() {
    if (adminComponent.products === showComponent) return <Products />;
    else if (adminComponent.orders === showComponent) return <Orders />;
    else {
      return <Users />;
    }
  }

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

                    <Disclosure as="div" className="border-gray-200  py-6">
                      <>
                        <h3
                          onClick={() => setShowComponent(adminComponent.users)}
                          className="-my-3 flow-root"
                        >
                          <Disclosure.Button
                            as="a"
                            href="#"
                            className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                          >
                            <div
                              className={` flex items-center hover:ml-11 transition-all duration-500 ml-5  ${
                                showComponent === adminComponent.users
                                  ? "ml-9"
                                  : ""
                              }`}
                            >
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
                        <h3
                          onClick={() =>
                            setShowComponent(adminComponent.products)
                          }
                          className="-my-3 flow-root"
                        >
                          <Disclosure.Button
                            as="a"
                            href="#"
                            className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                          >
                            <div
                              className={`flex items-center hover:ml-8 transition-all duration-500 ml-4 ${
                                showComponent === adminComponent.products
                                  ? "ml-7"
                                  : ""
                              } `}
                            >
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
                        <h3
                          onClick={() =>
                            setShowComponent(adminComponent.orders)
                          }
                          className="-my-3 flow-root"
                        >
                          <Disclosure.Button
                            as="a"
                            href="#"
                            className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                          >
                            <div
                              className={`ml-5 flex items-center hover:ml-9 transition-all duration-500 ${
                                showComponent === adminComponent.orders
                                  ? "ml-8"
                                  : ""
                              }`}
                            >
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-2  ">
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

            <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                <Disclosure as="div" className="border-gray-200  py-6">
                  <>
                    <h3
                      onClick={() => setShowComponent(adminComponent.users)}
                      className="-my-3 flow-root"
                    >
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                      >
                        <div
                          className={` flex items-center hover:ml-11 transition-all duration-500 ml-5  ${
                            showComponent === adminComponent.users ? "ml-9" : ""
                          }`}
                        >
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
                    <h3
                      onClick={() => setShowComponent(adminComponent.products)}
                      className="-my-3 flow-root"
                    >
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                      >
                        <div
                          className={`flex items-center hover:ml-8 transition-all duration-500 ml-4 ${
                            showComponent === adminComponent.products
                              ? "ml-7"
                              : ""
                          } `}
                        >
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
                    <h3
                      onClick={() => setShowComponent(adminComponent.orders)}
                      className="-my-3 flow-root"
                    >
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex w-full items-center justify-between rounded-md px-4 bg-gray-100 py-4 text-sm text-gray-600 hover:text-gray-700"
                      >
                        <div
                          className={`ml-5 flex items-center hover:ml-9 transition-all duration-500 ${
                            showComponent === adminComponent.orders
                              ? "ml-8"
                              : ""
                          }`}
                        >
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
                <div className="max-w-4xl mx-auto">
                  {/* {<Products products={products} /> || <Orders /> || <Users />} */}
                  {handleAdminComponent()}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Products() {
  const fetchedProducts = useSelector(selectProductsForFilter);
  const dispatch = useDispatch();
  const [isOpenForm, setForm] = useState(false);
  const [isOpenEditForm, setEditForm] = useState(false);
  const [products, setProducts] = useState(fetchedProducts);
  const [editProduct, setEditProduct] = useState();
  const product = useSelector(selectProductById);
  const outOfStock = fetchedProducts.filter((p) => p.stock === 0);

  function searchAdminProduct(e) {
    if (e.target.value) {
      const isProducts = fetchedProducts.filter((p) => {
        const title =
          p.title === "string"
            ? p.title.toLowerCase()
            : p.title.toString().toLowerCase();
        const brand =
          p.brand === "string"
            ? p.brand.toLowerCase()
            : p.brand.toString().toLowerCase();
        const category =
          p.brand === "string"
            ? p.category.toLowerCase()
            : p.category.toString().toLowerCase();
        const targetValue =
          e.target === "string"
            ? e.target.value.toLowerCase()
            : e.target.value.toString().toLowerCase();
        return (
          title.includes(targetValue) ||
          brand.includes(targetValue) ||
          category.includes(targetValue)
        );
      });
      setProducts(isProducts);
    } else {
      setProducts(fetchedProducts);
    }
  }

  function handleEditProduct(productId) {
    setEditForm(true);
    dispatch(fetchProductByIdAsync(productId));
    console.log(editProduct);
  }

  function handleAddProduct() {
    setForm(true);
  }

  useEffect(() => {
    dispatch(fetchProductFiltersAsync());
    console.log("hello world");
  }, [dispatch, isOpenEditForm, isOpenForm]);

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  return (
    <>
      {isOpenForm && (
        <ProductForm
          isOpenForm={isOpenForm}
          setForm={setForm}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      )}
      {isOpenEditForm && (
        <EditProductForm
          isOpenEditForm={isOpenEditForm}
          setEditForm={setEditForm}
          editProduct={product}
        />
      )}
      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Total Products
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {fetchedProducts.length}
          </span>
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Out of stock
          </h2>
          <span className="px-3 py-1 text-xs text-red-600 bg-red-100 rounded-full dark:bg-red-800 dark:text-red-400">
            {outOfStock.length}
          </span>
        </div>
      </div>
      <div className="relative overflow-x-auto overflow-y-auto h-screen shadow-md sm:rounded-lg">
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
              onChange={(e) => searchAdminProduct(e)}
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
              <th scope="col" className="p-4"></th>
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
                <button
                  onClick={() => handleAddProduct()}
                  className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded-xl"
                >
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
              products.map((p, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
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
                    <button
                      onClick={() => handleEditProduct(p.id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditProductForm({
  isOpenEditForm,
  setEditForm,
  editProduct,
  setEditProduct,
}) {
  const cancelButtonRef = useRef(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const images = [data.image1, data.image2, data.image3, data.image4];
    delete data.image1;
    delete data.image2;
    delete data.image3;
    delete data.image4;
    const newProduct = { ...data, images: images, id: editProduct.id };
    console.log(newProduct);
    dispatch(updateProductApiAsync(newProduct));
    setEditForm(false);
  };

  function handleCancelForm() {
    setEditForm(false);
  }

  useEffect(() => {
    console.log(editProduct);
    if (editProduct) {
      setValue("title", editProduct.title);
      setValue("brand", editProduct.brand);
      setValue("category", editProduct.category);
      setValue("price", editProduct.price);
      setValue("discountPercentage", editProduct.discountPercentage);
      setValue("stock", editProduct.stock);
      setValue("description", editProduct.description);
      setValue("thumbnail", editProduct.thumbnail);
      setValue("image1", editProduct.images[0]);
      setValue("image2", editProduct.images[1]);
      setValue("image3", editProduct.images[2]);
      setValue("image4", editProduct.images[3]);
    }
  }, [isOpenEditForm, editProduct]);

  return (
    <Transition.Root show={isOpenEditForm} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setEditForm}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="sm:flex-none  lg:flex md:flex min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="title"
                          {...register("title", {
                            required: true,
                            maxLength: 80,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="title"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Title
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="brand"
                          {...register("brand", {
                            required: true,
                            maxLength: 80,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="category"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Brand
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="category"
                          {...register("category", {
                            required: true,
                            maxLength: 80,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="state"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Category
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="price"
                          type="number"
                          {...register("price", {
                            required: true,
                            maxLength: 80,
                            valueAsNumber: true,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="price"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Price
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="stock"
                          {...register("stock", {
                            required: true,
                            maxLength: 80,
                            valueAsNumber: true,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="stock"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Stock
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="discountPercentage"
                          type="number"
                          {...register("discountPercentage", {
                            required: true,
                            maxLength: 80,
                            valueAsNumber: true,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="city"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Discount
                        </label>
                      </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        id="description"
                        {...register("description", {
                          required: true,
                        })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Description
                      </label>
                    </div>{" "}
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        id="thumbnail"
                        {...register("thumbnail", {
                          required: true,
                        })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Thumbnail
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="image1"
                          {...register("image1", {
                            required: true,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="stock"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Image 1
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="image2"
                          {...register("image2", {})}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="image2"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Image 2
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="image3"
                          {...register("image3", {})}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="image3"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Image 3
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="image4"
                          {...register("image4", {})}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="image4"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Image 4
                        </label>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => handleCancelForm()}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function ProductForm({ isOpenForm, setForm }) {
  const cancelButtonRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const images = [data.image1, data.image2, data.image3, data.image4];
    const newProduct = { ...data, images: images };
    dispatch(createProductApiAsync(newProduct));
    setForm(false);
  };

  function handleCancelForm() {
    setForm(false);
  }

  return (
    <Transition.Root show={isOpenForm} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setForm}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="sm:flex-none  lg:flex md:flex min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="title"
                          {...register("title", {
                            required: true,
                            maxLength: 80,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="title"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Title
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="brand"
                          {...register("brand", {
                            required: true,
                            maxLength: 80,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="category"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Brand
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="category"
                          {...register("category", {
                            required: true,
                            maxLength: 80,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="state"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Category
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="price"
                          type="number"
                          {...register("price", {
                            required: true,
                            maxLength: 80,
                            valueAsNumber: true,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="price"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Price
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="stock"
                          {...register("stock", {
                            required: true,
                            maxLength: 80,
                            valueAsNumber: true,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="stock"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Stock
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="discountPercentage"
                          type="number"
                          {...register("discountPercentage", {
                            required: true,
                            maxLength: 80,
                            valueAsNumber: true,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="city"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Discount
                        </label>
                      </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        id="description"
                        {...register("description", {
                          required: true,
                          maxLength: 80,
                        })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Description
                      </label>
                    </div>{" "}
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        id="thumbnail"
                        {...register("thumbnail", {
                          required: true,
                          maxLength: 80,
                        })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Thumbnail
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="image1"
                          {...register("image1", {
                            required: true,
                          })}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="stock"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Image 1
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="image2"
                          {...register("image2", {})}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="image2"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Image 2
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="image3"
                          {...register("image3", {})}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="image3"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Image 3
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          id="image4"
                          {...register("image4", {})}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="image4"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Image 4
                        </label>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => handleCancelForm()}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
