import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { check_auth_status } from "../actions/auth";
import { gtm } from "../lib/gtm";

export default function Layout({children}) {
  const dispatch = useDispatch();

  useEffect(() => {
    gtm.push({ event: 'gtm.js' });
    if(dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(check_auth_status());
    }
}, []);

    return (
<>
      <Head>
        <title>Home | Shutter</title>
      </Head>


      <Box
        component='main'
      >
        <Container maxWidth="lg">
          
          {children}
        </Container>
      </Box>
    </>
    )
} 