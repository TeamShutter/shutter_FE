import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import Layout from "../layouts/Layout";


export default function Logout() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout());
        }
    }, []);

    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    return (
        <Layout>

            <Head>
                <title>Logout | Shutter</title>
            </Head>

        </Layout>
    )
}