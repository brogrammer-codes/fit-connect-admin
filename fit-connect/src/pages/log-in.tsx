import { type NextPage } from "next";
import Image from "next/image";
import { Title } from "~/components/Title";
import { api } from "~/utils/api";
import { bench } from "assets";
import { Button, Input } from "~/components/atoms";
import { useRef } from "react";

const style = {
  wrapper: `flex min-h-screen flex-col bg-[#6A6A6A] text-white pt-14`,
  main: `mx-auto flex w-full max-w-5xl flex-1 space-x-6 p-10 content-center`,
  content: `w-full space-y-4 place-content-center bg-[#D9D9D9] h-auto rounded`,
  title: `text-5xl bg-[#4D6890] m-3 p-3 text-center font-semibold rounded`
}

const LogIn: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const loginRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <div className={style.wrapper}>

      <main className={style.main}>
        <div className={style.content}>
          <h1 className={style.title}>Log Into Your <Title /> Account</h1>
          <div className="flex flex-col space-y-3 p-10">
            <div className="flex flex-col w-1/2 space-y-3">
              <div>
                <label htmlFor="username" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Username</label>
                <Input inputRef={loginRef} placeholder="Enter your username here" required type={'text'} id='username' />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Password</label>
                <Input inputRef={passwordRef} placeholder="Enter your password here" required type="password" id='password'/>
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
