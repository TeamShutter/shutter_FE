import { Avatar, Box, Container, IconButton, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { GetPhoto } from "../../components/fetcher/fetcher";
import Head from "next/head";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from "next/link";


export default function Studio() {
    const router = useRouter();
    const {photoId} = router.query;

    const {data, isLoading, isError} = GetPhoto(photoId);
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
                    src={data.photoUrl}
                    srcSet={data.photoUrl}
                    alt={data.name}
                    loading="lazy"
                    layout='fill'
                    objectFit='contain'
                  />
  
                <Link href={`/studios/${data.studio.id}`}>
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
                    <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    >
                    <Avatar
                      alt={data.studio.name}
                      src={data.studio.thumbnail}
                      sx={{ width: 35, height: 35, ml: 2, mr: 2 }}
                    />
                      <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'white'
                      }}
                      >
                        {data.studio.name}
                      </Typography>
                      <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${data.name}`}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                  </Box>
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