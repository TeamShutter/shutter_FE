import Head from "next/head";
import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import Layout from "../layouts/Layout";


export default function Logout() {
    const auth = useAuth();
    useEffect(() => {
        auth.logout();
    }, []);

    return (
        <Layout>

            <Head>
                <title>Logout | Shutter</title>
            </Head>

        </Layout>
    )
}