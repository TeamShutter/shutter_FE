import { Avatar, Box, Container, IconButton, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { GetStudio } from "../../components/fetcher/fetcher";
import Head from "next/head";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";


export default function Studio() {
    const router = useRouter();
    const {photoId} = router.query;

    const {data, isLoading, isError} = GetStudio(photoId);
    console.log(data);

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error!!</div>


    return data && (

        <>
        <Head>
          <title>Shutter | Photo</title>
        </Head>
  
        <Box
          component='main'
        >
          <Container maxWidth="lg">

              <Link 
              href="/"
              >
                <a>
                  <ArrowBackIosNewIcon sx={{ mb : 2}} /> 
                </a>
              </Link>


               <ImageListItem>
                  <img
                    src="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg"
                    srcSet="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg"
                    alt={data.name}
                    loading="lazy"
                    layout='fill'
                    objectFit='contain'
                  />
  
                <Link href={`/studios/${data.id}`}>
                <a>
                  <ImageListItemBar
                  sx={{
                    height: '70px',
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  title={data.name}
                  position="top"
                  actionIcon={
                    <Avatar
                      alt="Seungoh"
                      src="https://lh3.googleusercontent.com/ogw/AOh-ky1nopWhtlQcp95uSrMtPxDc56QwHDrCH5qCZYlc=s64-c-mo"
                      sx={{ width: 35, height: 35, ml: 2, mr: 2 }}
                    />
                    }
                  actionPosition="left"
                />
                </a>
                </Link>
  
                </ImageListItem>

          </Container>
        </Box>
      </>
    )
}