"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateProduct = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [productFormData, setProductFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentages: "",
    stock: "",
    brand: "",
    thumbnail: "",
    category: "beauty",
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
      setProductFormData({
        ...productFormData,
        category: categoriesArray[0],
      });
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  const resetFormData = () => {
    setProductFormData({
      title: "",
      description: "",
      price: "",
      discountPercentages: "",
      stock: "",
      brand: "",
      thumbnail: "",
      category: "beauty",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({
      ...productFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.API_URI}/products`, productFormData);
      resetFormData();
      router.push("/products");
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center w-full h-[93.5svh] ">
      <div className="relative w-full h-full">
        <div
          className="absolute bg-white rounded-lg top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full md:w-[50%] "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              Create New Product
            </h3>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Type product name"
                  required
                  value={productFormData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="$2999"
                  required
                  value={productFormData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="discountPercentages"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discountPercentages"
                  id="discountPercentages"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="9.99%"
                  required
                  value={productFormData.discountPercentages}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="stock"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Stock (Pic)
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="500"
                  required
                  value={productFormData.stock}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Type product Brand Name"
                  required
                  value={productFormData.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="thumbnail"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  id="thumbnail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
                  required
                  value={productFormData.thumbnail}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  value={productFormData.category}
                  onChange={handleChange}
                >
                  {categories.map((category, i) => {
                    return (
                      <option value={category} className="capitalize">
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Write product description here"
                  value={productFormData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
