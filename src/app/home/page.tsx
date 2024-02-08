"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import SideBar from "@/components/sidebar/SideBar";

export default function Home() {
  const { userInfo, openWallet } = useAuthCore();
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();

  const [balance, setBalance] = useState<string>("");
  const [userInfoIsValid, setUserInfoIsValid] = useState<boolean>(false);

  const router = useRouter();

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

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
    } else if (userInfo) {
      setUserInfoIsValid(true);
      fetchBalance();
    }
  }, [router, userInfo]);

  // useEffect(() => {
  //   if (userInfo) {
  //     fetchBalance();
  //   }
  // }, [userInfo, smartAccount, customProvider]);

  const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);

    setBalance(ethers.utils.formatEther(balanceResponse).toString());
  };

  const executeTx = async () => {
    // async function executeTx() {
    // Not using below because it throws following error:
    // TypeError: Cannot read properties of undefined (reading 'endsWith')

    // const signer = customProvider.getSigner();

    // const txnParams = {
    //   to: "0x00000000000000000000000000000000000dEAD0",
    //   value: ethers.utils.parseEther("0.0001"),
    // };

    // const txResponse = await signer.sendTransaction(tx);
    // const txReceipt = await txResponse.wait();

    const tx = {
      tx: [
        {
          to: "0x000000000000000000000000000000000000dEaD",
          value: ethers.utils.parseEther("0.0001").toString(),
        },
      ],
    };

    const txResponse = await smartAccount.sendTransaction(tx);

    console.log("Transaction Hash: " + txResponse);
    console.log(
      "Transaction Hash Link: https://testnet.snowtrace.io/tx/" + txResponse,
    );
  };

  const executeBatchUserOp = async () => {
    const tx = {
      tx: [
        {
          to: "0x000000000000000000000000000000000000dEaD",
          value: ethers.utils.parseEther("0.0001").toString(),
        },
        {
          to: "0x000000000000000000000000000000000000dEaD",
          value: ethers.utils.parseEther("0.0001").toString(),
        },
      ],
    };
    const txResponse = await smartAccount.sendTransaction(tx);

    console.log(`Transaction Hash: ${txResponse}`);
    console.log(`Transaction Hash Link: https://snowtrace.io/tx/${txResponse}`);
  };

  const handleOpenWallet = async () => {
    openWallet({
      windowSize: "small",
      topMenuType: "close",
    });
  };

  return (
    <div className="App">
      {userInfoIsValid ? (
        <main>
          <div className="mb-4 flex flex-row gap-4">
            <p>{balance} AVAX</p>
            <button className="" onClick={executeTx}>
              Execute User Operation
            </button>

            <button className="" onClick={executeBatchUserOp}>
              Execute Batch User Operation
            </button>
          </div>
          {/*
           
           
          */}
          <div className="grid h-screen grid-cols-sidebar">
            <SideBar
              name={userInfo && userInfo.name}
              isMember={true}
              handleOpenWallet={handleOpenWallet}
              handleLogout={disconnect}
            />
            <div className="mainPage bg-zinc-300"></div>
          </div>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
