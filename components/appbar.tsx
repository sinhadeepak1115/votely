"use client";
import Link from "next/link";
import { Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, useSession, signOut } from "next-auth/react";

const AppBar = () => {
  const session = useSession();
  console.log(session);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 ">
        <Link href="/" className="flex items-center space-x-3">
          <Vote className="h-8 w-8" />
          <span className="text-xl font-bold">PollMaster</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/create"
            className="text-sm font-medium hover:text-primary"
          >
            Create Poll
          </Link>
          <Link
            href="/polls"
            className="text-sm font-medium hover:text-primary"
          >
            View Polls
          </Link>
        </nav>
        {!session.data?.user && (
          <Button variant="outline" onClick={() => signIn()}>
            Login
          </Button>
        )}
        {session.data?.user && (
          <Button variant="outline" onClick={() => signOut()}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppBar;
