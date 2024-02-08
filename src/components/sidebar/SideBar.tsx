import React from "react";
import Link from "next/link";
import { UserPanel } from "./UserProfilePanel";
import { Button } from "@/components/ui/button";

type userPanelProps = {
  name: string | undefined;
  isMember: boolean;
  handleOpenWallet: () => void;
  handleLogout: () => void;
};

export default function SideBar({
  name,
  isMember,
  handleOpenWallet,
  handleLogout,
}: userPanelProps) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-start gap-y-4">
        <ul>
          <li>Recent</li>
          <li>Find creators</li>
          <li>Notifications</li>
          <li>
            <Button variant="ghost" onClick={handleOpenWallet}>
              Wallet
            </Button>
          </li>
          <li>Settings</li>
        </ul>
        <p>
          <u>Memberships</u>
        </p>
        <ul>
          <li>spacemen2202</li>
          <li>highernature</li>
          <li>earthpreservarance</li>
        </ul>
      </div>

      <UserPanel name={name} isMember={isMember} handleLogout={handleLogout} />
    </div>
  );
}
