import Head from 'next/head'
import { GetStudios } from '../components/fetcher/fetcher'
import { Box, Container, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { theme } from '../theme';
import Link from 'next/link';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Home() {
  const {data, isLoading, isError} = GetStudios();

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error!!</div>
  console.log("data: ", data);

  return data && (
    <>
      <Head>
        <title>Shutter | Home</title>
      </Head>

      <Box
        component='main'
      >
        <Container maxWidth="lg">

        <Typography 
        variant='h2'
        sx={{
          textAlign: 'center',
          mb: 10,
          }} >
          Shutter
        </Typography>


        <ImageList sx={{ width: '100%', height: 1000 }} cols={3} gap={10}>
          
          {data.map((photo) => (
              <Link 
              href={`photos/${photo.id}`}
              key={photo.name}
              >
             <a>
             <ImageListItem>
                <img
                  src="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg"
                  srcSet="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg"
                  alt={photo.name}
                  loading="lazy"
                  layout='fill'
                  objectFit='contain'
                />

              <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={photo.name}
              position="bottom"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${photo.name}`}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />

              </ImageListItem>
             </a>
            </Link>
          ))}

        </ImageList>

        </Container>
      </Box>
    </>
  )
}
