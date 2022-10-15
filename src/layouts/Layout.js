import { Box, Container } from "@mui/material";
import Head from "next/head";

export default function Layout({children}) {
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