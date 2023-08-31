import { SignInButton, UserButton, auth, SignUpButton } from "@clerk/nextjs";
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
        <Link href={"/"}>
          <span className="text-2xl font-bold text-lime-500">Fit</span>{" "}
          <span className="text-xl font-bold text-slate-400">Connect</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          {userId ? (
            <>
              <MainNav className="mx-6" />
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="flex space-x-2">
              <SignInButton>
                <button className="flex px-3 py-1 bg-slate-500 rounded-xl font-semibold text-slate-200">Log In</button>
              </SignInButton>
              <SignUpButton>
                <button className="flex px-3 py-1 bg-slate-800 rounded-xl font-semibold text-slate-200">Create</button>

              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
