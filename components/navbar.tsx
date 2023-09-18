"use client";
import { SignInButton, UserButton, SignUpButton } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import Link from "next/link";
import { useState } from "react"; // Import useState
import { Button } from "./ui/button";
import { ArrowUp, Menu } from "lucide-react";
const Navbar: React.FC<{ signedIn: boolean }> = ({ signedIn }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 bg-slate-700">
        <Link href={"/"}>
          <span className="text-2xl font-bold text-lime-500">Fit</span>{" "}
          <span className="text-xl font-bold text-slate-400">Connect</span>
        </Link>
        {signedIn ? (
          <Button
            onClick={() => setMobileMenuOpen((menu) => !menu)}
            className="md:hidden ml-auto p-2 text-slate-200"
          >
            {isMobileMenuOpen ? <ArrowUp /> : <Menu />}
          </Button>
        ) : (
          <SignInButton>
            <button className="flex px-3 py-1 bg-slate-500 rounded font-semibold text-slate-200  ml-auto">
              Sign-In/Create
            </button>
          </SignInButton>
        )}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 h-screen right-0 w-full p-4 bg-slate-700 z-10">
            <div className="flex w-full justify-end">
              <UserButton afterSignOutUrl="/" />
            </div>
            <MainNav onClickCallback={() => setMobileMenuOpen(false)} />
          </div>
        )}
        <div className="hidden md:ml-auto md:flex items-center space-x-4">
          {signedIn ? (
            <>
              <MainNav />
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="flex space-x-2">
              <SignInButton>
                <button className="flex px-3 py-1 bg-slate-500 rounded-xl font-semibold text-slate-200">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="flex px-3 py-1 bg-slate-800 rounded-xl font-semibold text-slate-200">
                  Create
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
