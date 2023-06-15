import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";


const style = {
  wrapper: `flex min-h-screen flex-col bg-[#6A6A6A] text-white`,
  main: `mx-auto flex w-full max-w-5xl flex-1 space-x-6 py-5 px-6`,
  content: `w-full space-y-4 lg:w-2/3 place-content-center`,
  infoContainer: `hidden w-1/3 lg:block`,
}

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className={style.wrapper}>

      <main className={style.main}>
        <div className={style.content}>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-slate-50">Fit</span> Connect
          </h1>
        </div>
        <div className={style.infoContainer}>
          <div>
            Side Immage here
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
