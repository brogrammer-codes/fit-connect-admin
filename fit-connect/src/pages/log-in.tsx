import { type NextPage } from "next";
import Image from "next/image";
import { Title } from "~/components/Title";
import { api } from "~/utils/api";
import { bench } from "assets";
import { Button } from "~/components/atoms";

const style = {
  wrapper: `flex min-h-screen flex-col bg-[#6A6A6A] text-white pt-14`,
  main: `mx-auto flex w-full max-w-5xl flex-1 space-x-6 p-10 content-center`,
  content: `w-full space-y-4 place-content-center bg-[#D9D9D9] h-auto rounded`,
  title: `text-5xl bg-[#4D6890] m-3 p-3 text-center font-semibold rounded`
}

const LogIn: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className={style.wrapper}>

      <main className={style.main}>
        <div className={style.content}>
          <h1 className={style.title}>Log Into Your <Title /> Account</h1>
          <div className="flex flex-col space-y-3 p-10">
            <div className="flex flex-col w-1/2 space-y-3">
              <div>
                <label htmlFor="username" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Password</label>
                <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </div>
              <span className="text-[#6A6A6A] italic">Forgot Password?</span>
              <Button buttonText="Log In"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogIn;
