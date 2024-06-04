import { useSearchParams } from "next/navigation";

export default function SearchBar() {
    const searchParams = useSearchParams();

    const sucursalID = searchParams.get("id");

    return sucursalID;

}