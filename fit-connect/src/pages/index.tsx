import { type NextPage } from "next";
import Image from "next/image";
import { Title } from "~/components/Title";
import { api } from "~/utils/api";
import { bench } from "assets";

const style = {
  wrapper: `flex min-h-screen flex-col bg-[#6A6A6A] text-white pt-14`,
  main: `mx-auto flex w-full max-w-screen-lg flex-1 space-x-6 p-10 content-center`,
  content: `w-full space-y-4 lg:w-2/3 place-content-center `,
  infoContainer: `hidden w-1/3 lg:block`,
}

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className={style.wrapper}>

      <main className={style.main}>
        <div className={style.content}>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Welcome to, <br />
            <Title />
          </h1>
          <p className="font-mono text-center text-xl">
            Fit Connect is a comprehensive web application that connects fitness trainers specializing in various disciplines with clients seeking personalized workout plans.
            <br />
            With features like custom plan creation, progress tracking, and trainer-client communication, Fit Connect fosters a dynamic and effective fitness training experience.
          </p>
        </div>
        <div className={style.infoContainer}>
          <Image src={bench} width={330} height={675} alt="info image" className="rounded"/>
        </div>
      </main>
    </div>
  );
};

export default Home;
