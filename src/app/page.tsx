import Link from "next/link";

const Home = () => {
  return (
    <div className="text-blue-600 p-32 flex flex-row gap-12">
      <Link href={"/login"}>Login</Link>
    </div>
  );
};

export default Home;
