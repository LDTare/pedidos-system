"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function BtnRegresar() {
    const router = useRouter();

    return (
        <Button
            variant="secondary"
            onClick={() => {
                router.refresh();
                router.back();
            }}
        >
            Regresar
        </Button>
    );
}

export default BtnRegresar;