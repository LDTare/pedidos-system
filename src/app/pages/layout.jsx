"use client";
import { SiteHeader } from "../objects/navegacion/header";
import { SiteFooter } from "../objects/navegacion/footer";

export default function PagesLayout({ children }) {
    return (
        <>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        </>
    );
    }
