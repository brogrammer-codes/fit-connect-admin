import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/main-nav";

const Navbar = async () => {
  const { userId } = auth();

  //   if (!userId) {
  //     redirect('/sign-in');
  //   }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <span>Fit Connect</span>

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
