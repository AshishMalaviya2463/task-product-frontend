"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderBtns = () => {
  const pathName = usePathname();

  return (
    <>
      <Link
        href={
          pathName !== "/products/create" ? "/products/create" : "/products"
        }
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer transition-all"
      >
        {pathName !== "/products/create" ? "Create Product" : "Go To Products"}
      </Link>
    </>
  );
};

export default HeaderBtns;
