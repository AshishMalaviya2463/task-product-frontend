import Image from "next/image";
import Link from "next/link";
import HeaderBtns from "./HeaderBtns";

const Header = () => {
  return (
    <>
      <div className="fixed top-0 left-0 bg-white w-full h-[6.5svh] flex items-center justify-between px-5 shadow-md">
        <Link href={"/"}>
          <Image src={"/logo.png"} width={45} height={45} alt="logo" />
        </Link>
        <HeaderBtns />
      </div>
    </>
  );
};

export default Header;
