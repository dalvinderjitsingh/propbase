"use client";

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

import { Button } from "@/components/ui/button";

export default function LogIn() {
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
      router.push("/home");
    }
  }, [userInfo, router]);

  //const handleLogin = async (authType: any) => {
  const handleLogin = async (authType?: "google" | "twitter") => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: AvalancheTestnet,
      });

      router.push("/home");
    }
  };

  return (
    <Button variant="outline" onClick={() => handleLogin()}>
      Login
    </Button>
  );
}
