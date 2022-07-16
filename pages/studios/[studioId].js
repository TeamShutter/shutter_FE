import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';


export default function Studio() {
    const router = useRouter();
    const {studioId} = router.query;

    // const {data, isLoading, isError} = GetStudio(studioId);
    // console.log(data);

    // if(isLoading) return <div>Loading...</div>
    // if(isError) return <div>Error!!</div>


    return (

        <>
        <Head>
          <title>Shutter | Studio</title>
        </Head>
  
        <Box
          component='main'
        >
          <Container maxWidth="lg">

             <Link 
              href="/"
              >
                <a>
                  <HomeIcon sx={{ mb : 2}} /> 
                </a>
              </Link>

                <Typography variant="h2">
                    Studio {studioId}
                </Typography>
          </Container>
        </Box>
      </>
    )
}