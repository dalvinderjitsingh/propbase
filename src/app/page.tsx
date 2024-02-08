import React from "react";

import Link from "next/link";

import NavBar from "@/components/NavBar";
export default function page() {
  return (
    <div className="">
      <NavBar />
      <main className="grid h-screen place-items-center">
        <div className="flex flex-col items-center gap-y-6">
          <h1 className="text-5xl font-black">PATRON SPHERE</h1>
          <p className="text-3xl font-light text-zinc-600">
            The next level web3 Patreon killer and much more.
          </p>
        </div>
      </main>
    </div>
  );
}

//
