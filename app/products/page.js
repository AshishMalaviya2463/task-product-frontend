"use client";

import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceSortValue, setPriceSortValue] = useState({
    minPrice: null,
    maxPrice: null,
    sortBy: null,
  });

  const getCategories = async () => {
    try {
      const categoriesData = await axios.get(
        `${process.env.API_URI}/products/categories`
      );
      const categoriesArray = Object.entries(categoriesData.data).map(
        ([key, value]) => value
      );
      setCategories(categoriesArray);
    } catch (error) {}
  };

  const getProductList = async (search = "") => {
    try {
      const params = new URLSearchParams();

      if (searchValue) {
        params.append("search", searchValue);
      }

      if (selectedCategories.length > 0) {
        params.append("category", selectedCategories.join(","));
      }

      if (priceSortValue.sortBy) {
        params.append("sort", priceSortValue.sortBy);
      }

      if (priceSortValue.minPrice !== null) {
        params.append("minPrice", priceSortValue.minPrice);
      }
      if (priceSortValue.maxPrice !== null) {
        params.append("maxPrice", priceSortValue.maxPrice);
      }

      const productsData = await axios.get(
        `${process.env.API_URI}/products?${params.toString()}`
      );
      setProducts(productsData.data);
    } catch (error) {}
  };

  const searchTimeout = useRef();
  const debounceSearch = useCallback(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      getProductList();
    }, 500);
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      debounceSearch();
    } else {
      getProductList();
    }
  }, [searchValue, debounceSearch]);

  useEffect(() => {
    getProductList();
  }, [selectedCategories, priceSortValue]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleFilterOnCategories = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  return (
    <div className="container mx-auto flex py-3 gap-6">
      <div className="w-[20%]">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Products"
            required
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-slate-950 mb-1">
            Filter Products By Categories
          </p>
          {categories.map((category, i) => {
            return (
              <div className="flex items-center mb-4" key={i + 1}>
                <input
                  id={category}
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-0"
                  onChange={() => {
                    handleFilterOnCategories(category);
                  }}
                />
                <label
                  htmlFor={category}
                  className="ms-2 text-sm font-medium text-gray-900 capitalize"
                >
                  {category}
                </label>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-slate-950 mb-1">
            Sort Products By Price
          </p>
          <div className="grid gap-4 grid-cols-2 mt-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Minimum Price
              </label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Minimum Price"
                value={priceSortValue.minPrice || 0}
                onChange={(e) =>
                  setPriceSortValue({
                    ...priceSortValue,
                    minPrice:
                      Number(e.target.value) > 0
                        ? Number(e.target.value)
                        : null,
                  })
                }
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Maximum Price
              </label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Maximum Price"
                value={priceSortValue.maxPrice || 0}
                onChange={(e) =>
                  setPriceSortValue({
                    ...priceSortValue,
                    maxPrice:
                      Number(e.target.value) > 0
                        ? Number(e.target.value)
                        : null,
                  })
                }
              />
            </div>
          </div>
          <div
            className={`cursor-pointer p-2 ${
              priceSortValue.sortBy === "lth" ? "bg-blue-200" : ""
            } hover:bg-blue-200 transition-all rounded mt-1`}
            onClick={() =>
              setPriceSortValue({
                ...priceSortValue,
                sortBy: priceSortValue.sortBy !== "lth" ? "lth" : null,
              })
            }
          >
            <p className="text-sm">Low to High</p>
          </div>
          <div
            className={`cursor-pointer p-2 ${
              priceSortValue.sortBy === "htl" ? "bg-blue-200" : ""
            } hover:bg-blue-200 transition-all rounded`}
            onClick={() =>
              setPriceSortValue({
                ...priceSortValue,
                sortBy: priceSortValue.sortBy !== "htl" ? "htl" : null,
              })
            }
          >
            <p className="text-sm">High to Low</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 w-[80%] gap-5 h-fit">
        {products.length > 0 ? (
          products.map((product) => {
            const originalPrice =
              Number(product.price) /
              (1 - Number(product.discountPercentages) / 100);

            return (
              <div
                key={product._id}
                className="flex flex-col items-center justify-center"
              >
                <div className="bg-slate-400 w-full rounded-md flex items-center justify-center">
                  <Image
                    src={product.thumbnail}
                    alt="product_image"
                    width={250}
                    height={250}
                  />
                </div>
                <div className="w-full flex flex-col items-start">
                  <p className="text-base font-medium mt-1 text-black">
                    {product.title}
                  </p>
                  <p className="text-base font-semibold mt-[2px] text-slate-600">
                    ${product.price}{" "}
                    <span className="text-base font-semibold mt-[2px] text-slate-400 line-through">
                      {originalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        ) : searchValue.trim().length > 0 ||
          selectedCategories.length > 0 ||
          priceSortValue.sortBy !== null ||
          priceSortValue.minPrice !== null ||
          priceSortValue.maxPrice !== null ? (
          <p className="text-lg">No Products Found</p>
        ) : (
          <p className="text-lg">No Products Available</p>
        )}
      </div>
    </div>
  );
}
