import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DotsVerticalIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type userPanelProps = {
  name: string | undefined;
  isMember: boolean;
  handleLogout: () => void;
};

export function UserPanel({ name, isMember, handleLogout }: userPanelProps) {
  return (
    <div className="flex items-center justify-between gap-x-4 rounded-lg bg-zinc-200 p-4">
      <div className="flex flex-row gap-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>{name}</p>
          <p>
            <i>{isMember ? "Member" : "Creator"}</i>
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuItem>Light</DropdownMenuItem>
          <DropdownMenuItem>Dark</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
