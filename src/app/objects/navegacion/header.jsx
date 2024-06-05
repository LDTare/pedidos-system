import Link from "next/link"


import { cn } from "@/lib/utils"

import { MainNav } from "./navbar"
import { buttonVariants } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            Usuario logeado
          </div>
        </div>
      </div>
    </header>
  )
}