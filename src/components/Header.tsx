"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { logout } from "@/actions";

const SiteHeader = () => {

  return (
    <nav className="sticky top-0 h-[10vh] flex justify-center items-center z-50  border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between max-h-[10vh]  items-center">
        <Link href="/">
          <h1 className=" text-lg mr-4 font-bold sm:inline-block">
            Repoto
          </h1>
        </Link>
        <div className="flex jsutify-center items-center">
          <div className="lg:flex md:hidden items-center gap-10">
            <Link
              className="font-bold text-base transition-colors hover:text-foreground/80 text-foreground/60"
              href="/about"
            >
              About
            </Link>
            <Link
              className="font-bold text-base transition-colors hover:text-foreground/80 text-foreground/60"
              href="/"
            >
              Explore
            </Link>
            {/* <Link
              className="font-bold text-base transition-colors hover:text-foreground/80 text-foreground/60"
              href="/"
            >
              Contact Us
            </Link> */}
          </div>
          {/* {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex gap-4">
              <SignUpButton mode="modal">
                <Button size="sm" variant="ghost">
                  Sign Up
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </div>
          )} */}
        </div>
          <div className="flex gap-1">
            <ModeToggle />
            <Link href={"/dashboard"}>
               <Button>Dashboard</Button>
            </Link>
            <Link href={"/register"}>
               <Button>Register</Button>
            </Link>
            <Link href={"/login"}>
               <Button>Login</Button>
            </Link>

            <Button onClick={()=>logout()}>Logout</Button>
          </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
