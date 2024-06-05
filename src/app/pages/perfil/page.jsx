"use client";
import { useRouter } from "next/navigation";

export default function Perfil() {
    const router = useRouter();
    return (
        <div className="space-y-6">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="text-muted-foreground">
            Esta es la página de perfil de la empresa.
        </p>
        </div>
    );
    }
    