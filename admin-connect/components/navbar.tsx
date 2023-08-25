import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import Link from "next/link";

const Navbar = async () => {
  const { userId } = auth();

  //   if (!userId) {
  //     redirect('/sign-in');
  //   }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 bg-slate-700">
        <Link href={'/'}><span className="text-2xl font-bold text-lime-500">Fit</span> <span className="text-xl font-bold text-slate-400">Connect</span></Link>

        <div className="ml-auto flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          {userId ? (
            <>
              <MainNav className="mx-6" />
              <UserButton afterSignOutUrl="/" />
            </>
          ) : <SignInButton/ >}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
