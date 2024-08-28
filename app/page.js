import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-3">
      <h1 className="text-2xl text-center">Welcome to E-Com World</h1>
      <Link
        href={"/products"}
        className="text-lg w-full text-center block mt-3 text-blue-400 hover:text-blue-600 transition-all hover:underline"
      >
        Go to Products Page
      </Link>
    </div>
  );
}
