"use client";

import "../../../styles/App.css";

import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";

import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import { AvalancheTestnet } from "@particle-network/chains";
import {
  AAWrapProvider,
  SendTransactionMode,
  SmartAccount,
} from "@particle-network/aa";

import { ethers } from "ethers";

export default function Page() {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();

  const smartAccount = new SmartAccount(provider, {
    projectId: "7d82e328-50cd-4154-b6a1-b4c9c89e4da5",
    clientKey: "cQBNwp1An92iWe0uquuMwp6yofIxkH9erMa9PsUx",
    appId: "23319595-10e2-4731-9898-422e4e0582b6",
    aaOptions: {
      accountContracts: {
        SIMPLE: [{ chainIds: [AvalancheTestnet.id], version: "1.0.0" }],
      },
    },
  });

  const customProvider = new ethers.providers.Web3Provider(provider, "any");

  const [balance, setBalance] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      router.push("../../home");
    }
  }, [userInfo, router]);

  const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);

    setBalance(ethers.utils.formatEther(balanceResponse).toString());
  };

  //const handleLogin = async (authType: any) => {
  const handleLogin = async (authType?: "google" | "twitter") => {
    {
      if (!userInfo) {
        await connect({
          socialType: authType,
          chain: AvalancheTestnet,
        });

        router.push("../../home");
      }
    }
  };

  return (
    <main className="App">
      <div className="login-section">
        <button
          className="sign-button google-button"
          onClick={() => handleLogin("google")}
        >
          {/* <img
              src="https://i.imgur.com/nIN9P4A.png"
              alt="Google"
              className="icon"
            /> */}
          Sign in with Google
        </button>
        <button
          className="sign-button twitter-button"
          onClick={() => handleLogin("twitter")}
        >
          {/* <img
              src="https://i.imgur.com/afIaQJC.png"
              alt="Twitter"
              className="icon"
            /> */}
          Sign in with X
        </button>
        <button
          className="sign-button other-button"
          onClick={() => handleLogin()}
        >
          Particle Login Model
        </button>
      </div>
    </main>
  );
}
