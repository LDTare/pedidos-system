"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          La puntada dorada
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/pages/web_site"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/pages/web_site" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Sitio WEB
        </Link>
        <Link
          href="/pages/pedidos"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/pages/pedidos" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Ordenes
        </Link>
        <Link
          href="/pages/usuarios/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/pages/usuarios" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Usuarios
        </Link>
      </nav>
    </div>
  )
}