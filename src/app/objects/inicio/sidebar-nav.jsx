"use strict";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function SidebarNav({ className, items, ...props }) {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: "delivery" }),
                        pathname === item.href
                            ? "bg-gray-600 hover:bg-gray-400"
                            : "hover:bg-blue-600 hover:underline",
                        "justify-start"
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}

