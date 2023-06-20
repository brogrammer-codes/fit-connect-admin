import { type NextPage } from "next";
import Image from "next/image";
import { Title } from "~/components/Title";
import { api } from "~/utils/api";
import { bench } from "assets";
import { Button, Pill, Switch } from "~/components/atoms";

const style = {
  wrapper: `flex min-h-screen flex-col bg-[#6A6A6A] text-white pt-14`,
  main: `mx-auto flex w-full max-w-5xl flex-1 space-x-6 p-10 content-center`,
  content: `w-full space-y-4 place-content-center bg-[#D9D9D9] h-auto rounded`,
  title: `text-5xl bg-[#4D6890] m-3 p-3 text-center font-semibold rounded`,
  formBody: `flex flex-col space-y-3 p-10 text-2xl`
}

const SignUp: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className={style.wrapper}>

      <main className={style.main}>
        <div className={style.content}>
          <h1 className={style.title}>Create your <Title /> Account</h1>
          <div className={style.formBody}>
            <span>You are a...</span>
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <input id="athlete-radio-1" type="radio" value="" name="role-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="athlete-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Athlete</label>
              </div>
              <div className="flex items-center">
                <input checked id="coach-radio-1" type="radio" value="" name="role-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="coach-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Coach</label>
              </div>
            </div>
            <span className="text-lg">You want to look for coaches or trainers. You want to train people in specific disciplines</span>
            <Switch label="Public Account?" value={true}/>
            <Button buttonText="Sign Up" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
