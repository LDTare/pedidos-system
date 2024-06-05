"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";

import { signOut, useSession } from "next-auth/react";

export function UserNav() {
    const { data: session, status } = useSession();
    const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-none">
            {
                session?.user? session.user.username : "Usuario"
            }
          <Avatar className="h-9 w-9">
            <AvatarImage src="/user.png" alt="@shadcn" />
            <AvatarFallback>Usuario</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
                {session?.user? session.user.name : "Usuario"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
                {session?.user? session.user.email : "Usuario"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <Button 
            onClick={() => {
                router.push("/pages/perfil?id="+session.user.id);
            }}
            variant="ghost">Perfil</Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="ghost"
            onClick={() => {
              signOut();
            }}
          >
            Cerrar sesión
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
