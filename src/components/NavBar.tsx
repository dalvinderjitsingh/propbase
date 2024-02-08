import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogIn from "./LogIn";

export default function NavBar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <ul className="flex items-center justify-between bg-zinc-200 p-5">
        <li>
          <h1>PATRON SPHERE</h1>
        </li>
        <div className="flex gap-x-2.5">
          <li>
            <LogIn />
          </li>
          <li>
            <Button asChild>
              <Link href="/home">Launch App</Link>
            </Button>
          </li>
        </div>
      </ul>
    </nav>
  );
}
