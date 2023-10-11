import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartApiAsync,
  fetchCartByUserAsync,
  selectCart,
} from "../Slices/CartSlice";
import { fetchCartByUser } from "../Api/cartApi";
import { DiscountContext, useDiscount } from "../Context/UseDiscount";
import { selectUserToken } from "../Slices/authSlice";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductInfo() {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(selectProductById);
  const cart = useSelector(selectCart);
  const discountPrice = useDiscount(DiscountContext);
  const userToken = useSelector(selectUserToken);
  const navigate = useNavigate();

  function handleAddToCart(productId) {
    if (userToken) {
      if (cart) {
        const index = cart.findIndex((item) => item.product.id === productId);
        if (index === -1) {
          dispatch(
            addToCartApiAsync({
              product: productId,
              quantity: 1,
              discountPrice: Number(
                discountPrice(product.price, product.discountPercentage)
              ),
            })
          );
        } else {
          alert("Item is already added.");
        }
      }
    } else {
      navigate("/login");
    }
  }

  console.log(product);
  useEffect(() => {
    if (params.id) {
      console.log(params.id);
      dispatch(fetchProductByIdAsync(params.id));
    }
  }, [params, dispatch]);

  return (
    <>
      {product && (
        <div className="bg-white">
          <div className="pt-6">
            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.images[2]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product.images[3]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>

                <p className="text-3xl tracking-tight text-gray-900">
                  ${discountPrice(product.price, product.discountPercentage)}
                  <span className="text-2xl ml-4 tracking-tight text-red-600">
                    -{product.discountPercentage.toFixed(0)}%
                  </span>
                  <span className="font-semibold text-sm ml-2 line-through tracking-tight text-gray-900">
                    ${product.price}
                  </span>
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {Array.from({ length: Math.floor(product.rating) }).map(
                        (rating, index) => (
                          <StarIcon
                            key={index}
                            className={classNames(
                              reviews.average > rating
                                ? "text-gray-900"
                                : " text-orange-400",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        )
                      )}
                    </div>
                    {Math.floor(product.rating) > 0 && (
                      <div className="ml-4">
                        <h1>{product.rating.toFixed(2)} out of 5 rating</h1>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sizes */}
                <div className="w-full flex justify-center">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0}
                    className={`mt-10 flex  w-3/5 items-center justify-center rounded-full border border-transparent px-6 py-2 text-base font-semibold text-black focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      product.stock === 0 ? "bg-orange-300" : "bg-yellow-500"
                    }  ${product.stock === 0 ? "" : "hover:bg-yellow-600 "} ${
                      product.stock === 0 ? "" : "focus:ring-yellow-500 "
                    } `}
                  >
                    Add to Cart
                  </button>
                </div>
                <>
                  {cart.length ? (
                    <div className="w-full flex justify-center">
                      <Link
                        to={"/cart"}
                        className={`mt-2 flex  w-3/5 items-center justify-center rounded-full border border-transparent 
                          bg-gray-500
                         px-6 py-2 text-base font-medium text-white 
                           hover:bg-gray-600 
                        focus:outline-none focus:ring-2 
                          focus:ring-gray-500 
                         focus:ring-offset-2`}
                      >
                        {" "}
                        Go to Cart
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="text-2xl">Highlights</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Availability
                  </h2>

                  <div className="mt-4 space-y-6">
                    <p
                      className={` text-sm-600 ${
                        product.stock > 0 ? " text-green-500 " : "text-red-500"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
