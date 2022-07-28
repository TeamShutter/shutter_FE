import { useRouter } from "next/router";
import { useEffect } from "react";
import { removeCookie } from "../components/cookie"


export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        removeCookie("user", null);
        router.push("/");
    }, []);

    return <div>Logout</div> 
}